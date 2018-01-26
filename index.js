const NodentCompiler = require('nodent-compiler');
const createFilter = require('rollup-pluginutils').createFilter;

module.exports = function (options) {
	options = options || {};
	const filter = createFilter(options.include, options.exclude);
	const compiler = new NodentCompiler();

	return {
		name: 'nodent',
		options(opts) {
			options.sourcemap = 'sourcemap' in options ? options.sourcemap : // Plugin options
				'sourcemap' in opts ? opts.sourcemap : // Rollup options
					opts.sourceMap !== false; // Old style Rollup options
			Object.assign(options, {
				parser: Object.assign({}, options.parser || {}, {
					plugins: Object.assign({}, options.parser && options.parser.plugins || {}, {
						dynamicImport: true
					}),
					onParserInstallation(acorn) {
						if (options.onParserInstallation) {
							options.onParserInstallation(acorn);
						}
						// Patch acorn to support dynamic import
						// eslint-disable-next-line import/no-extraneous-dependencies
						require('acorn-dynamic-import/lib/inject').default(acorn);
					}
				})
			});
		},
		transform(code, id) {
			if (!filter(id)) {
				return;
			}
			const res = compiler.compile(code, id, options);
			return {
				code: res.code,
				map: options.sourcemap ? res.sourcemap : {mappings: ''}
			};
		}
	};
};
