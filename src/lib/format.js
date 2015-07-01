'use strict';

export const format = {

    /**
     * Command: format('a: {}')('A') === ['a: A']
     * @author Nate Ferrero
     */
    all : function (args, vals) {
        return args.map(function (arg) {
            vals.forEach(function (val) {
                arg = arg.replace('{}', val);
            });
            return arg;
        });
    }
};

