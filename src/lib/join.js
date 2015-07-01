'use strict';

export const join = {

    /**
     * Command: join('-')(1, 2, 3) === ['1-2-3']
     * @author Nate Ferrero
     */
    all : function (args, vals) {
        return args.map(function (arg) {
            return vals.join(arg);
        });
    }
};

