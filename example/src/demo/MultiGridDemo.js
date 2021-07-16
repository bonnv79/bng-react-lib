import React from 'react';
import { Components } from 'bng-react-lib';
import {
  ContentBox,
} from '../common/ContentBox';
import { LabeledInput, InputRow } from '../common/LabeledInput';
import FormLabel from '../common/FormLabel';

const { MultiGrid } = Components;

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

for (let i = 1; i <= 1000; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

// columns data
const columns = [
  {
    width: 50,
    label: 'Id',
    dataKey: 'id',
    sort: true,
    align: 'center' // left-right-center default left
  },
  {
    width: 300,
    label: 'Dessert',
    dataKey: 'dessert',
    sort: true,
    align: 'left'
  },
  {
    width: 120,
    label: 'Calories\u00A0(g)',
    dataKey: 'calories',
    sort: true,
    align: 'right'
  },
  {
    width: 120,
    label: 'Fat\u00A0(g)',
    dataKey: 'fat',
    sort: true,
    align: 'right'
  },
  {
    width: 120,
    label: 'Carbs\u00A0(g)',
    dataKey: 'carbs',
    sort: true,
    align: 'right'
  },
  {
    width: 120,
    label: 'Protein\u00A0(g)',
    dataKey: 'protein',
    sort: false,
    align: 'right'
  },
];

export default class MultiGridExample extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fixedColumnCount: 0,
      fixedRowCount: 0,
      scrollToColumn: 0,
      scrollToRow: 0,
      value: '',
      rowData: {}
    };

    this._onFixedColumnCountChange = this._createEventHandler('fixedColumnCount');
    this._onFixedRowCountChange = this._createEventHandler('fixedRowCount');
    this._onScrollToColumnChange = this._createEventHandler('scrollToColumn');
    this._onScrollToRowChange = this._createEventHandler('scrollToRow');
  }

  _createEventHandler(property) {
    return event => {
      const value = parseInt(event.target.value, 10) || 0;

      this.setState({
        [property]: value,
      });
    };
  }

  _createLabeledInput(property, eventHandler) {
    const value = this.state[property];

    return (
      <LabeledInput
        label={property}
        name={property}
        onChange={eventHandler}
        value={value}
      />
    );
  }

  _onRowClick = (value, rowData, index, dataKey) => {
    this.setState({
      value,
      rowData
    })
  }

  render() {
    const {
      fixedColumnCount,
      fixedRowCount,
      scrollToColumn,
      scrollToRow,
      value,
      rowData
    } = this.state;

    return (
      <ContentBox>
        <InputRow>
          {this._createLabeledInput(
            'fixedColumnCount',
            this._onFixedColumnCountChange,
          )}
          {this._createLabeledInput(
            'fixedRowCount',
            this._onFixedRowCountChange,
          )}
          {this._createLabeledInput(
            'scrollToColumn',
            this._onScrollToColumnChange,
          )}
          {this._createLabeledInput('scrollToRow', this._onScrollToRowChange)}
        </InputRow>

        <FormLabel label="Value: ">
          {value}
        </FormLabel>

        <FormLabel label="Selected row data: ">
          {JSON.stringify(rowData)}
        </FormLabel>

        <div style={{ width: '100%', height: 360 }}>
          <MultiGrid
            rows={rows}
            columns={columns}
            fixedColumnCount={fixedColumnCount}
            fixedRowCount={fixedRowCount}
            scrollToColumn={scrollToColumn}
            scrollToRow={scrollToRow}
            onRowClick={this._onRowClick}
            value={value}
          />
        </div>
      </ContentBox>
    );
  }
}