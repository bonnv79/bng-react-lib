import React from 'react';
import Home from './common/Home';
import DelaySearch from './demo/DelaySearch.example';
import NumberFormat from './demo/NumberFormat.example';
import VirtualizedTable from './demo/VirtualizedTable.example';
import MultiGridTable from './demo/MultiGridTable.example';
import ReactSortableTree from './demo/ReactSortableTree.example';
import VirtualizedSelect from './demo/VirtualizedSelect.example';
import EllipsisTooltip from './demo/EllipsisTooltip.example';
import SortableVirtualList from './demo/SortableVirtualList.example';
import 'bng-react-lib/dist/index.css';
import { getURL } from './common/utils';

const data = [
  {
    id: 'SortableVirtualList',
    label: 'Sortable VirtualList',
    component: <SortableVirtualList />,
    sourceLink: getURL('SortableVirtualList.example.js'),
    docsLink: ''
  },
  {
    id: 'EllipsisTooltip',
    label: 'Ellipsis Tooltip',
    component: <EllipsisTooltip />,
    sourceLink: getURL('EllipsisTooltip.example.js'),
    docsLink: ''
  },
  {
    id: 'VirtualizedTable',
    label: 'Virtualized Table',
    component: <VirtualizedTable />,
    sourceLink: getURL('VirtualizedTable.example.js'),
  },
  {
    id: 'VirtualizedSelect',
    label: 'Virtualized Select',
    component: <VirtualizedSelect />,
    sourceLink: getURL('VirtualizedSelect.example.js'),
    docsLink: 'react-virtua-select'
  },
  {
    id: 'ReactSortableTree',
    label: 'React Sortable Tree',
    component: <ReactSortableTree />,
    sourceLink: getURL('ReactSortableTree.example.js'),
    docsLink: 'react-sortable-tree-node'
  },
  {
    id: 'MultiGridTable',
    label: 'Multi Grid Table',
    component: <MultiGridTable />,
    sourceLink: getURL('MultiGridTable.example.js'),
    docsLink: 'react-virtualized-multi-grid'
  },
  {
    id: 'DelaySearch',
    label: 'Delay Search',
    component: <DelaySearch />,
    sourceLink: getURL('DelaySearch.example.js'),
    docsLink: 'bnv-utils'
  },
  {
    id: 'NumberFormat',
    label: 'Number Format',
    component: <NumberFormat />,
    sourceLink: getURL('NumberFormat.example.js'),
    docsLink: 'bnv-utils'
  },
];

const App = () => {
  return <Home title='BNG React Lib' subTitle="Welcome to example page" data={data} version="1.7.0" />;
}

export default App
