import React from 'react';
import Home from './common/Home';
import DelaySearch from './demo/DelaySearch.example';
import VirtualizedTable from './demo/VirtualizedTable.example';
import MultiGridTable from './demo/MultiGridTable.example';
import ReactSortableTree from './demo/ReactSortableTree.example';
import 'bng-react-lib/dist/index.css';
import { getURL } from './common/utils';

const data = [
  {
    id: 'ReactSortableTree',
    label: 'React Sortable Tree',
    component: <ReactSortableTree />,
    sourceLink: getURL('ReactSortableTree.example.js'),
    docsLink: ''
  },
  {
    id: 'MultiGridTable',
    label: 'Multi Grid Table',
    component: <MultiGridTable />,
    sourceLink: getURL('MultiGridTable.example.js'),
    docsLink: ''
  },
  {
    id: 'VirtualizedTable',
    label: 'Virtualized Table',
    component: <VirtualizedTable />,
    sourceLink: getURL('VirtualizedTable.example.js'),
  },
  {
    id: 'DelaySearch',
    label: 'Delay Search',
    component: <DelaySearch />,
    sourceLink: getURL('DelaySearch.example.js'),
  },
];

const App = () => {
  return <Home title='BNG React Lib' subTitle="Welcome to example page" data={data} version="1.3.0" />;
}

export default App
