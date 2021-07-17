import React from 'react';
import Home from './common/Home';
import DelaySearchDemo from './demo/DelaySearchDemo';
import VirtualizedTableDemo from './demo/VirtualizedTableDemo';
import MultiGridDemo from './demo/MultiGridDemo';
import 'bng-react-lib/dist/index.css';

const data = [
  {
    id: 'MultiGridDemo',
    label: 'Multi Grid',
    component: <MultiGridDemo />
  },
  {
    id: 'DelaySearchDemo',
    label: 'Delay Search',
    component: <DelaySearchDemo />
  },
  {
    id: 'VirtualizedTableDemo',
    label: 'Virtualized Table',
    component: <VirtualizedTableDemo />
  },
];

const App = () => {
  return <Home title='BNG Demo' data={data} version="1.0.9" />;
}

export default App
