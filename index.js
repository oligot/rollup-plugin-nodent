const nodent = require('nodent')();
const createFilter = require('rollup-pluginutils').createFilter;

module.exports = function (options) {
	options = options || {};
	const filter = createFilter(options.include, options.exclude);
	options.sourcemap = options.sourceMap || true;

	return {
		name: 'nodent',
		transform(code, id) {
			if (!filter(id)) {
				return;
			}
			const res = nodent.compile(code, id, null, options);
			return {
				code: res.code,
				map: options.sourcemap ? res.sourcemap : {mappings: ''}
			};
		}
	};
};
