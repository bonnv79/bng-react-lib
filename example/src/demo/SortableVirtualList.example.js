import React from 'react';
import { SortableVirtualList } from 'bng-react-lib';
import { FormLabel } from '../common/Form';

function getItems(count) {
  const data = [];
  for (let i = 0; i < count; i += 1) {
    data.push({
      id: `item-${i}`,
      label: `item ${i}`,
    })
  }
  return data;
}

export default function SortableVirtualListExample() {
  const [count, setCount] = React.useState(1000);
  const [shouldUseDragHandle, setShouldUseDragHandle] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(getItems(count));

  return (
    <div>
      <FormLabel label="Row Count">
        <input type="number" value={count} onChange={e => {
          const newCount = e.target.value
          setCount(newCount);
          setData(getItems(newCount))
        }} />
      </FormLabel>
      <FormLabel label="shouldUseDragHandle">
        <input type="checkbox" checked={shouldUseDragHandle} onChange={() => setShouldUseDragHandle(!shouldUseDragHandle)} />
      </FormLabel>

      <div style={{ width: 500, height: 380 }}>
        <SortableVirtualList
          shouldUseDragHandle={shouldUseDragHandle}
          items={data}
          value={value}
          onClick={(id, row) => {
            setValue(id);
          }}
          onSortStart={({ items, index, node }) => {
            // console.log('onSortStart', 'items', 'index', index, 'node', node);
          }}
          onSortEnd={({ items, oldIndex, newIndex, node }) => {
            // console.log('onSortEnd', 'items', 'oldIndex', oldIndex, 'newIndex', newIndex, 'node', node);
            setValue(node.id);
          }}
        />
      </div>
    </div>
  );
}
