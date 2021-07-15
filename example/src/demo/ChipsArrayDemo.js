import React from 'react';
import BngLib from 'bng-react-lib';
import { Button } from '@material-ui/core';

const initData = [
  { key: 0, label: 'Angular', icon: 'react' },
  { key: 1, label: 'jQuery' },
  { key: 2, label: 'Polymer' },
  { key: 3, label: 'React' },
  { key: 4, label: 'Vue.js' },
];

function ChipsArrayDemo() {
  const [data, setData] = React.useState(initData);

  const reloadData = () => {
    setData(initData);
  }

  return <div>
    <div style={{ display: 'flex' }}>
      <Button onClick={reloadData} color="primary">Reload data</Button>
      <BngLib.ChipsArray data={data} onChange={setData} />
    </div>
    <div>
      const dataDemo = {JSON.stringify(data, undefined, 2)}
    </div>
  </div>
}

export default ChipsArrayDemo;
