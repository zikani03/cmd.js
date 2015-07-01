'use strict';

export const log = {

    /**
     * Command: log('a') - logs to console
     * @author Nate Ferrero
     */
    args : [],
    each : function (args, val) {
        if (cmd.$logInterface) {
            cmd.$logInterface.log.call(cmd.$logInterface, val);
        }
        else {
            console.log(val);
        }
        return val;
    }
};

