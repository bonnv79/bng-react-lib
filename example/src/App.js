import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Home from './demo';
import DelaySearchDemo from './demo/DelaySearchDemo';
import ChipsArrayDemo from './demo/ChipsArrayDemo';

const data = [
  {
    id: 'DelaySearchDemo',
    label: 'Delay Search',
    icon: <ChevronRightIcon />,
    component: <DelaySearchDemo />
  },
  {
    id: 'ChipsArrayDemo',
    label: 'Chips Array',
    icon: <ChevronRightIcon />,
    component: <ChipsArrayDemo />,
    hidden: true
  }
];

const App = () => {
  return <Home title='BNG Demo' data={data} />;
}

export default App
