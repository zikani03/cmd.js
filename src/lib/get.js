'use strict';

export const get = {

    /**
     * Command: get('color')({color: 'red'}) === ['red']
     *          get('color').raw({color: 'red'}) === 'red'
     * @author Nate Ferrero
     */
    each : function (args, val) {
        var exists = this.exists.raw;
        args.forEach(function (arg) {
            if (exists(val)) {
                val = val[arg];
            }
        });
        return val;
    }
};

