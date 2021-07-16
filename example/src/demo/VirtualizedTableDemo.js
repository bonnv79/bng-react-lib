import React from 'react';
import { Components } from 'bng-react-lib';
import FormLabel from '../common/FormLabel';

const { VirtualizedTable } = Components;

// Render mockup data
const sample = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread long long long long long long', 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 1; i < 2000; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}


// columns data
const columns = [
  {
    width: 300,
    label: 'Dessert',
    dataKey: 'dessert',
  },
  {
    width: 120,
    label: 'Calories\u00A0(g)',
    dataKey: 'calories',
    numeric: true,
  },
  {
    width: 120,
    label: 'Fat\u00A0(g)',
    dataKey: 'fat',
    numeric: true,
  },
  {
    width: 120,
    label: 'Carbs\u00A0(g)',
    dataKey: 'carbs',
    numeric: true,
  },
  {
    width: 120,
    label: 'Protein\u00A0(g)',
    dataKey: 'protein',
    numeric: true,
  },
];

export default function ReactVirtualizedTable() {
  const [value, setValue] = React.useState('');
  const [multi, setMulti] = React.useState(false);

  const onRowClick = (v) => {
    setValue(v);
  }

  const handleChangeMulti = () => {
    setMulti(!multi);
    setValue('');
  }

  return (
    <div>
      <div>
        <FormLabel label='Multi Mode' style={{ width: 400 }}>
          <input type='checkbox' checked={multi} onChange={handleChangeMulti} />
        </FormLabel>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ height: 'calc(100vh - 150px)', width: '100%' }}>
          <VirtualizedTable
            selectedItems={value}
            rows={rows}
            columns={columns}
            onRowClick={onRowClick}
            multi={multi}
          />
        </div>

        <FormLabel label='Value' style={{ width: 400 }}>
          <textarea style={{ width: '100%', height: '100%' }} readOnly value={JSON.stringify(value, undefined, 2)} />
        </FormLabel>
      </div>
    </div>
  );
}
