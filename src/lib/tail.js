'use strict';

export const tail = {

    /**
     * Command: tail(2) - returns the last number of values
     * @author Alexey Ershov
     */
    all : function (args, vals) {
        var slice = Array.prototype.slice;
        args = slice.call(args, 0, 1);

        // if(args > 0) {
        //     args = - args;
        // }
        return slice.call(vals, -args);
    }
};

