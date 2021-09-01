# bng-react-lib

> bng-react-lib

[![NPM](https://img.shields.io/npm/v/bng-react-lib.svg)](https://www.npmjs.com/package/bng-react-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bng-react-lib
```
## `Important Notes`

- `MultiGridTable` is replaced by [react-virtualized-multi-grid - npm](https://www.npmjs.com/package/react-virtualized-multi-grid)

- `ReactSortableTree` is replaced by [react-sortable-tree-node - npm](https://www.npmjs.com/package/react-sortable-tree-node)

- `VirtualizedSelect` is replaced by [react-virtua-select - npm](https://www.npmjs.com/package/react-virtua-select)

- `utils` is replaced by [bnv-utils - npm](https://www.npmjs.com/package/bnv-utils)

## Demo
<a href="https://bonnv79.github.io/bng-react-lib/">Click open demo<a/>

## Usage

```jsx
import 'bng-react-lib/dist/index.css';
import { 
  Utils,
  VirtualizedTable, 
  MultiGridTable,
  ReactSortableTree,
  VirtualizedSelect,
  EllipsisTooltip,
  SortableVirtualList
} from 'bng-react-lib';

// Utils
const { 
  // makeDelaySearch
  makeDelaySearch,
  // search
  search,
  // numberFormat
  LOCALES,
  makeNumberFormat,
  numberDecimal
} = Utils;

```

### Dependencies

*** Extend from [react-virtualized](https://github.com/bvaughn/react-virtualized)

- MultiGridTable
- VirtualizedTable

*** Extend from [react-sortable-tree](https://github.com/frontend-collective/react-sortable-tree)

- ReactSortableTree

*** Extend from [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc)

- SortableVirtualList

## License

MIT © [bonnv79](https://github.com/bonnv79)
