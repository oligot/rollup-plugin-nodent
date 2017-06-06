# rollup-plugin-nodent

Convert ES2017 async/await with [nodent](https://github.com/MatAtBread/nodent)


## Installation

```bash
npm install --save-dev rollup-plugin-nodent
```


## Usage

```js
import { rollup } from 'rollup';
import nodent from 'rollup-plugin-nodent';

rollup({
  entry: 'main.js',
  plugins: [nodent()]
}).then(...)
```

## License

MIT
