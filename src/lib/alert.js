'use strict';

export const alert_ =  {

    /**
     * Command: alert('a') - shows an alert
     * @author Nate Ferrero
     */
    args : [],
    each : function (args, val) {
        return typeof alert === 'function' ? alert(val) : undefined;
    }
};

