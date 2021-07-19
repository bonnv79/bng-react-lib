import React from 'react';
import Home from './common/Home';
import DelaySearch from './demo/DelaySearch.example';
import VirtualizedTable from './demo/VirtualizedTable.example';
import MultiGrid from './demo/MultiGrid.example';
import 'bng-react-lib/dist/index.css';
import { getURL } from './common/utils';

const data = [
  {
    id: 'MultiGrid',
    label: 'Multi Grid',
    component: <MultiGrid />,
    sourceLink: getURL('MultiGrid.example.js'),
    docsLink: ''
  },
  {
    id: 'DelaySearch',
    label: 'Delay Search',
    component: <DelaySearch />,
    sourceLink: getURL('DelaySearch.example.js'),
  },
  {
    id: 'VirtualizedTable',
    label: 'Virtualized Table',
    component: <VirtualizedTable />,
    sourceLink: getURL('VirtualizedTable.example.js'),
  },
];

const App = () => {
  return <Home title='BNG Demo' data={data} version="1.0.9" />;
}

export default App
