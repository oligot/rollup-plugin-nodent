# rollup-plugin-nodent

Convert ES2017 async/await with [nodent](https://github.com/MatAtBread/nodent)


## Installation

```bash
npm install --save-dev rollup-plugin-nodent
```


## Usage

```js
// rollup.config.js
import nodent from 'rollup-plugin-nodent';

export default {
  entry: 'main.js',
  dest: 'bundle.js',
  format: 'iife',
  plugins: [nodent()],
  sourceMap: true
};
```

## License

MIT
