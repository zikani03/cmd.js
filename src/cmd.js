import {add} from './lib/add.js';

/**
 * Helper to merge array arguments
 */
const merge = function (args) {
	var _args = [];
	Array.prototype.forEach.call(args, (arg) => {
		if (Array.isArray(arg)) {
			Array.prototype.push.apply(_args, arg);
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
	
	use (module) {
		const self = this;
		if (module === '*') {
			//this.libs.forEach((mod) => this.use(mod));
            this.module('add', add);
			return;
		}
        // self.module(module, this[module]);
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
		/*
		// Early support promises
		if (mod.then) {
			this.registerPromiseFn(name, mod.then, mod);
			return;
		}
		*/
	}
	
	get libs() {
		return [
			'add'
		];
	}
	
	registerEachFn (name, fn, module) {
		if (typeof fn !== 'function') {
            throw new Error('cmd.registerEachFn(name, fn), fn was not a function, got ' + typeof fn);
        }

		// Add a command to the command prototype
		// Doesn't this affect other commands that may have different 
		// definitions for the same names?? e.g.
		// add = each : (args, val) => val + 1 and
		// add = each : (args, val) => val + args[0]
		Command.prototype.__defineGetter__(name, function() {
			const valsLoader = (args) =>
				this.vals(name, (vals) => {
					const eachFn = (val) => fn(args, val)
					
					if (! Array.isArray(vals)) {
						return eachFn(vals);
					}
					
					return vals.map(eachFn);
				});
			/**
             * Expect the arguments to be provided in the form cmd.x(...args...)(...vals...)
             * but still allow default argSets to be used
             */
            const argsLoader = this.args(name, (args) => valsLoader(args));
			
			return argsLoader;
		});
		
	}
	
	registerAllFn (name, allFn, module) {
			
	}
	
	registerRawFn (name, rawFn) {
		if (typeof rawFn !== 'function') {
            throw new Error('cmd.registerRawFn(name, fn), fn was not a function, got ' + typeof rawFn);
        }
        Command.prototype.__defineGetter__(name, function () {
            return rawFn;
        });
        return cmd[name];	
	}
	
	get map() {
		return true;
	}
	
	with () {
		if (!this.fn) {
            throw new Error('Inappropriate place to call .with()')
        }
		
		return this.fn(Array.from(arguments));
		// return this.args('with', this.fn).apply(null, Array.prototype.slice.call(arguments));
	}
	
	to () {
		if (!this.fn) {
            throw new Error('fn was not a function, got ' + typeof this.fn);
		}
		
		return this.fn(Array.from(arguments));
	}
	
	args (name, done) {
		const args = function () {	
			return done(merge(arguments));
		};
		
		args.$name = name;
		// TODO: load args here ..
		
		/**
         * Skip argument merging with .to()
         */
        args.__defineGetter__('to', () =>
            () => done(Array.from(arguments))
        );
		
		return args;
	}
	
	vals (name, done) {
		const last = this.fn;
		
		return new Command((args)  => {
			if (last) {
				args = last(args);
			}
			return done(args);
		}, name);
	}
}


export var cmd = new Command();