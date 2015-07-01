'use strict';

export const default_ = {

    /**
     * Command: default(1)(null) === [1]
     *      default(1).raw(null) === 1
     * @author Nate Ferrero
     */
    each : function (args, val) {
        if (args.length !== 1) {
            throw new Error('Exactly one default must be provided');
        }
        return val !== null && val !== undefined ? val : args[0];
    }
};

