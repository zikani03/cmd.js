'use strict';

/**
 * Helper to merge array arguments
 */
const merge = function (args) {
	var _args = [];
    Array.prototype.forEach.call(args, (arg) => {
        if (Array.isArray(arg)) {
            _args.push(arg.pop());
        }
        else {
            _args.push(arg);
        }
    });
	return _args;
};

class Command {
	
	constructor (_fn, name) {
		this.fn = _fn ? _fn.bind(this) : null;
		this.name = name;
	}
	
	use (name) {
		const self = this;
		if (name === '*') {
			return this.libs.forEach((mod) => this.use(mod));
		}
        /**
         * Load via require for Node or from window for browser
         */
        var mod = require('./lib/' + name);

        if (!mod || typeof mod !== 'object') {
            throw new Error('cmd.js module ' + name + ' is not available');
        }
        
        var objName = name;
        if (name === 'do') {
            objName = 'do_';
        }
        if (name === 'case') {
            objName = 'case_';
        }
        if (name === 'alert') {
            objName = 'alert_';
        }
        if (name === 'default') {
            objName = 'default_';
        }

        self.module(name, mod[objName]);
	}
	
	module (name, mod) {
        
		if (mod.each) {
			this.registerEachFn(name, mod.each, mod);
			return;
		}
		
		if (mod.all) {
			this.registerAllFn(name, mod.all, mod);
			return;
		}
		
		if (mod.raw) {
			this.registerRawFn(name, mod.raw);
			return;
		}
	}
	
	get libs() {
		return [
            'add', 'alert',
            'call', 'case', 'clone', 'compare', 'count',
            'default', 'divide', 'do',
            'equals', 'exists', 'extend',
            'filter', 'first', 'format',
            'get', 'group', 'gt', 'gte',
            'has', 'head',
            'join',
            'last', 'log', 'logger', 'lt', 'lte',
            'match', 'max', 'min', 'multiply',
            'not',
            'obj',
            'product', 'push',
            'reject', 'reverse',
            'slice', 'sort', 'subtract', 'sum',
            'tail', 'tap'
		];
	}
    
    get raw () {
        return (value) => {
            if (!this.fn) {
                throw new Error('Inappropriate place to call .raw()')
            }
            return this.fn(Array.isArray(value) ? value : [value])[0];
        };
    }
	
	registerEachFn (name, fn, plugin) {
		if (typeof fn !== 'function') {
            throw new Error('cmd.registerEachFn(name, fn), fn was not a function, got ' + typeof fn);
        }

		Command.prototype.__defineGetter__(name, function() {
			const self = this;
              
            const valsLoader = (args) => {
                return self.vals(name, function (vals) {
                    const eachFn = function (val) {
                        if (self.map) {
                            if (!Array.isArray(val)) {
                                val = [val];
                            }

                            return vals.map(v => {
                                return fn(args, v);
                            });
                        }
                        return fn(args, val);
                    };
                    if (! Array.isArray(vals)) {
                        return eachFn(vals);
                    }
                    return vals.map(eachFn);
                });
            };
            /**
             * Expect the arguments to be provided in the form cmd.x(...args...)(...vals...)
             * but still allow default argSets to be used
             */
            const argsLoader = self.args(name, (args) => valsLoader(args));

            if (typeof plugin.argSets === 'object' && plugin.argSets) {
                Object.keys(plugin.argSets).forEach(function (key) {
                    argsLoader.__defineGetter__(key, function () {
                        return valsLoader(plugin.argSets[key]);
                    });
                });
            }
			
			return argsLoader;
		});
		return Command.prototype[name];
	}
	
	registerAllFn (name, fn, plugin) {
        if (typeof fn !== 'function') {
            throw new Error('cmd.registerAllFn(name, fn), fn was not a function, got ' + typeof fn);
        }
        
        Command.prototype.__defineGetter__(name, function () {
            var self = this;

            /**
             * Values loader
             */
            var valsLoader = function (args) {
                return self.vals(name, function (vals) {
                    if (!Array.isArray(vals)) {
                        vals = [vals];
                    }
                    if (self.map) {
                        return vals.map(val => {
                            if (!Array.isArray(val)) {
                                val = [val];
                            }
                            return fn(args, val);
                        });
                    }
                    return fn(args, vals);
                });
            };

            /**
             * Handle the case where plugin.args is defined
             */
            if (typeof plugin.args !== 'undefined') {
                return valsLoader(plugin.args);
            }

            /**
             * Expect the arguments to be provided in the form cmd.x(...args...)(...vals...)
             * but still allow default argSets to be used
             */
            const argsLoader = self.args(name, (args) => valsLoader(args));

            if (typeof plugin.argSets === 'object' && plugin.argSets) {
                Object.keys(plugin.argSets).forEach(function (key) {
                    argsLoader.__defineGetter__(key, function () {
                        return valsLoader(plugin.argSets[key]);
                    });
                });
            }

            return argsLoader;
        });
        return Command.prototype[name];
	}
	
	registerRawFn (name, rawFn) {
		if (typeof rawFn !== 'function') {
            throw new Error('cmd.registerRawFn(name, fn), fn was not a function, got ' + typeof rawFn);
        }
        Command.prototype.__defineGetter__(name, function () {
            return rawFn;
        });
        return Command.prototype[name];
	}
	
	get map() {
		return false;
	}
	
	with () {
		if (!this.fn) {
            throw new Error('Inappropriate place to call .with()')
        }
		
        /**
         * Merge multiple subsets of arguments
         */
        if (this.map) {
            var self = this;
            return Array.prototype.map.call(arguments, (args) => {
                if (!Array.isArray(args)) {
                    args = [args];
                }
                return self.args('with', self.fn).apply(self, args);
            });
        }
		return this.args('with', this.fn).apply(null, Array.prototype.slice.call(arguments));
	}
	
	to () {
		if (!this.fn) {
            throw new Error('fn was not a function, got ' + typeof this.fn);
		}
		
		return this.fn(Array.prototype.slice.call(arguments));
	}
	
	args (name, done) {
		const args = function () {
            return done(merge(arguments));
        };
		
		args.$name = name;		
		/**
         * Skip argument merging with .to()
         */
        args.__defineGetter__('to', () =>
            () => done(Array.prototype.slice.call(arguments))
        );
		
		return args;
	}
	
	vals (name, done) {
		const last = this.fn;
		
		return new Command((args)  => {
			if (last) {
				args = last(merge(args));
			}
			return done(args);
		}, name);
	}
}

export var cmd = new Command();