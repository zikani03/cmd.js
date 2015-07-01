'use strict';

export const push = {

    /**
     * Command: push.to([1])(2) -> [1, 2]
     * @author Nate Ferrero
     */
    each : function (args, val) {
        args.map(function (arg) {
            arg.push(val);
        });
        return val;
    }
};

