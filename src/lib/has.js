'use strict';

export const has = {

    /**
     * Command: has('color')({color: 'red'}) === [true]
     *          has('color').raw({color: 'red'}) === true
     * @author Nate Ferrero
     */
    each : function (args, val) {
        for (var i in args) {
            if (val.hasOwnProperty(args[i])) {
                val = val[args[i]];
            }
            else {
                return false;
            }
        }
        return true;
    }
};

