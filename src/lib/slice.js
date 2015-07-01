'use strict';

export const slice = {

    /**
     * Command: slice(1, 2) - returns a section of an array
     * @author Alexey Ershov
     */
    all : function (args, vals) {
        var slice = Array.prototype.slice;
        return slice.apply(vals, args);
    }
};

