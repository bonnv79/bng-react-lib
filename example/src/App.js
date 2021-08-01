import React from 'react';
import Home from './common/Home';
import DelaySearch from './demo/DelaySearch.example';
import NumberFormat from './demo/NumberFormat.example';
import VirtualizedTable from './demo/VirtualizedTable.example';
import MultiGridTable from './demo/MultiGridTable.example';
import ReactSortableTree from './demo/ReactSortableTree.example';
import VirtualizedSelect from './demo/VirtualizedSelect.example';
import EllipsisTooltip from './demo/EllipsisTooltip.example';
import 'bng-react-lib/dist/index.css';
import { getURL } from './common/utils';

const data = [
  {
    id: 'EllipsisTooltip',
    label: 'Ellipsis Tooltip',
    component: <EllipsisTooltip />,
    sourceLink: getURL('EllipsisTooltip.example.js'),
    docsLink: ''
  },
  {
    id: 'VirtualizedSelect',
    label: 'Virtualized Select',
    component: <VirtualizedSelect />,
    sourceLink: getURL('VirtualizedSelect.example.js'),
    docsLink: ''
  },
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
  {
    id: 'NumberFormat',
    label: 'Number Format',
    component: <NumberFormat />,
    sourceLink: getURL('NumberFormat.example.js'),
  },
];

const App = () => {
  return <Home title='BNG React Lib' subTitle="Welcome to example page" data={data} version="1.5.2" />;
}

export default App
