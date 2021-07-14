# bng-react-lib

> bng-react-lib

[![NPM](https://img.shields.io/npm/v/bng-react-lib.svg)](https://www.npmjs.com/package/bng-react-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bng-react-lib
```

## Demo
<a href="https://ngovanbon16.github.io/bng-react-lib/">Click open demo<a/>

## Usage

```jsx
import React, { Component } from 'react'

import { ChipsArray } from 'bng-react-lib'
import 'bng-react-lib/dist/index.css'

const initData = [
  { key: 0, label: 'Angular', icon: 'react' },
  { key: 1, label: 'jQuery' },
  { key: 2, label: 'Polymer' },
  { key: 3, label: 'React' },
  { key: 4, label: 'Vue.js' },
];

class Example extends Component {
  const [data, setData] = React.useState(initData);

  render() {
    return <ChipsArray data={data} onChange={setData} />
  }
}
```

## License

MIT © [ngovanbon16](https://github.com/ngovanbon16)
