'use strict';

export const reject = {

    /**
     * Command: reject(function (x) {
     *          return x >= 3;
     *      })(1, 2, 3) === [3]
     * @author Nate Ferrero
     */
    all : function (args, vals) {
        return vals.filter(function (val) {
            var len = args.length;
            var i = -1;
            while (++i < len) {
                if ((args[i].raw || args[i])(val)) {
                    return false;
                }
            }
            return true;
        });
    }
};

