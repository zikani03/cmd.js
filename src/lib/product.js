'use strict';

export const product = {

    /**
     * Command: product(1, 2, 3, 4, 5) - returns the product of all values
     * @author Nate Ferrero
     */
    args : [],
    all : function (args, vals) {
        var product = 1;
        for (var i = vals.length; i--;) {
            product *= vals[i];
        }
        return product;
    }
};

