const nodent = require('nodent')();
const createFilter = require('rollup-pluginutils').createFilter;

module.exports = function (options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: 'nodent',
		options(opts) {
			options.sourcemap = 'sourcemap' in options ? options.sourcemap : // Plugin options
			'sourcemap' in opts ? opts.sourcemap : // Rollup options
			opts.sourceMap !== false; // Old style Rollup options
		},
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
