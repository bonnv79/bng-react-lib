import React from 'react';
import { Components } from 'bng-react-lib';
import FormLabel from './Common/FormLabel';

const { ChipsArray } = Components;

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

  return (
    <div>
      <FormLabel label=''>
        <button onClick={reloadData} color="primary">Reload data</button>
      </FormLabel>
      <FormLabel label='Chips Array'>
        <ChipsArray data={data} onChange={setData} />
      </FormLabel>
      <FormLabel label='Data object'>
        {JSON.stringify(data, undefined, 2)}
      </FormLabel>
    </div>
  )
}

export default ChipsArrayDemo;
