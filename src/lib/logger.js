'use strict';

export const logger = {
    /**
     * Dependencies
     */

    /**
     * Command: logger(function (a) {
     *     return 10 * a;
     * }, 1)(1, 2, 3) - logs to console:
     * 10 1
     * 20 1
     * 30 1
     * @author Nate Ferrero
     */
    each : function (args, val) {
        // cmd.use('format');
        var logs = [];
        args.forEach(function (arg) {
            if (arg && arg.constructor === cmd.constructor) {
                arg = arg.raw(val);
            }
            var log = typeof arg === 'function' ? arg(val) : (
                typeof arg === 'string' ? cmd.format(arg).raw(val) : arg
            );
            if (Array.isArray(log)) {
                Array.prototype.push.apply(logs, log);
            }
            else {
                logs.push(log);
            }
        });
        if (cmd.$loggerInterface) {
            cmd.$loggerInterface.log.apply(cmd.$loggerInterface, logs);
        }
        else {
            console.log.apply(console, logs);
        }
        return val;
    }
};


