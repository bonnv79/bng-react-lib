import React from 'react';
import { ChipsArray } from 'bng-react-lib';
import BngLib from 'bng-react-lib';
import 'bng-react-lib/dist/index.css';
import styles from './styles.module.css';

const { Button } = BngLib;

const initData = [
  { key: 0, label: 'Angular', icon: 'react' },
  { key: 1, label: 'jQuery' },
  { key: 2, label: 'Polymer' },
  { key: 3, label: 'React' },
  { key: 4, label: 'Vue.js' },
];

const App = () => {
  const [data, setData] = React.useState(initData);

  const reloadData = () => {
    setData(initData);
  }

  return <div>
    <Button onClick={reloadData} color="primary">Reload data</Button>
    <div>
      <ChipsArray data={data} onChange={setData} />
    </div>
    <prev className={styles.textarea}>
      const dataDemo = {JSON.stringify(data, undefined, 2)}
    </prev>
  </div>
}

export default App
