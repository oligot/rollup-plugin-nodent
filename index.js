const path = require('path');
const importFrom = require('import-from');
// Patch acorn used in nodent-compiler to support dynamic import
const acorn = importFrom(path.dirname(require.resolve('nodent-compiler')), 'acorn');
// eslint-disable-next-line import/no-extraneous-dependencies
require('acorn-dynamic-import/lib/inject').default(acorn);
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
				parser: {
					plugins: {
						dynamicImport: true
					}
				}
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
