export const add = {
	/**
	 * Command: add(1)(5) - adds args to each value
	 * @author Nate Ferrero
	 */
	each : function (args, val) {
		args.forEach(function (arg) {
			val += arg;
		});
		return val;
	}
};
