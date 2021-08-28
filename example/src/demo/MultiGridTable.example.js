/** @flow */
import * as React from 'react';
import {
  ContentBox,
} from '../common/ContentBox';
import { LabeledInput, InputRow } from '../common/LabeledInput';
import { MultiGridTable } from 'bng-react-lib';
import { Container, FormLabel } from '../common/Form';
import styles from './MultiGridTable.module.css';

const sample = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread long long long long long long', 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id: `id-${id}`, dessert, calories, fat, carbs, protein };
}

const getRows = count => {
  const rows = [];

  for (let i = 1; i <= count; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
  }

  return rows;
};

const initColumns = [
  {
    width: 80,
    label: '#',
    dataKey: 'index',
    align: 'center', // left-right-center default left
    render: (value, rowData, rowIndex) => rowIndex + 1,
  },
  {
    width: 80,
    label: 'Id',
    dataKey: 'id',
    sort: true,
    align: 'left',
  },
  {
    width: 300,
    label: 'Dessert',
    dataKey: 'dessert',
    sort: true,
    align: 'left',
  },
  {
    width: 120,
    label: 'Calories\u00A0(g)',
    dataKey: 'calories',
    sort: true,
    align: 'right',
  },
  {
    width: 120,
    label: 'Fat\u00A0(g)',
    dataKey: 'fat',
    sort: true,
    align: 'right',
  },
  {
    width: 120,
    label: 'Carbs\u00A0(g)',
    dataKey: 'carbs',
    sort: true,
    align: 'right',
  },
  {
    width: 120,
    label: 'Protein\u00A0(g)',
    dataKey: 'protein',
    sort: false,
    align: 'right',
  },
];

const getColumns = (count = 0) => {
  const columns = [];

  initColumns.forEach(item => columns.push(item));

  for (let i = 0; i < count; i += 1) {
    columns.push({
      width: 150,
      label: `New column ${i}`,
      dataKey: `new-column-${i}`,
      sort: false,
    });
  }

  return columns;
};

export default class MultiGridTableExample extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    const defaultRowCount = 99;
    const defaultColumnCount = 10;
    this.state = {
      showConfig: true,
      showParams: false,
      fixedColumnCount: 0,
      fixedRowCount: 0,
      scrollToColumn: 0,
      scrollToRow: 0,
      value: {
        value: 'id-1', // set default value
      },
      rowCount: defaultRowCount,
      columnCount: defaultColumnCount,
      rows: getRows(defaultRowCount),
      columns: getColumns(defaultColumnCount),
      multiple: false,
      multipleShiftMode: false,
      sortBy: {
        sortBy: 'id', // set default sortBy
        sortDirection: 'asc',
      },
      scroll: {},
      autoSort: true,
      sortableColumn: false,
      resizeColumn: false,
    };

    this._onScrollToColumnChange = this._createEventHandler('scrollToColumn');
    this._onScrollToRowChange = this._createEventHandler('scrollToRow');
  }

  _createEventHandler(property, func) {
    return event => {
      let value = parseInt(event.target.value, 10) || 0;
      if (func) {
        value = func(value);
      }
      this.setState({
        [property]: value,
      });
    };
  }

  _onScrollRowCountChange = event => {
    const { rows } = this.state;
    const rowCount = parseInt(event.target.value, 10) || 0;
    const newState = {
      rowCount,
    };

    if (rows.length !== rowCount) {
      newState.rows = getRows(rowCount);
    }

    this.setState(newState);
  };

  _onScrollColumnCountChange = event => {
    const { columns } = this.state;
    const columnCount = parseInt(event.target.value, 10) || 0;
    const newState = {
      columnCount,
    };

    if (columns.length !== columnCount + initColumns.length) {
      newState.columns = getColumns(columnCount);
    }

    this.setState(newState);
  };

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

  _createLabeledCheckBox(property, eventHandler, disabled) {
    const value = this.state[property];
    return (
      <LabeledInput
        className=""
        label={property}
        name={property}
        onChange={eventHandler}
        value={value}
        type="checkbox"
        checked={value}
        disabled={disabled}
      />
    );
  }

  render() {
    const {
      showConfig,
      showParams,
      fixedColumnCount,
      fixedRowCount,
      scrollToColumn,
      scrollToRow,
      value,
      multiple,
      sortBy,
      scroll,
      autoSort,
      multipleShiftMode,
      sortableColumn,
      resizeColumn
    } = this.state;
    const { rows, columns } = this.state;
    let currentMultiple = multiple;

    if (currentMultiple && multipleShiftMode) {
      currentMultiple = 'shift';
    }

    return (
      <ContentBox>
        <Container inline>
          <FormLabel label="Show config" inline>
            <input type="checkbox" checked={showConfig} onChange={e => this.setState({ showConfig: e.target.checked })} />
          </FormLabel>
          <FormLabel label="Show params" inline>
            <input type="checkbox" checked={showParams} onChange={e => this.setState({ showParams: e.target.checked })} />
          </FormLabel>
        </Container>
        {
          showConfig && (
            <InputRow>
              {this._createLabeledInput(
                'fixedColumnCount',
                this._createEventHandler('fixedColumnCount', val => {
                  return val > columns.length - 1 ? columns.length - 1 : val;
                }),
              )}
              {this._createLabeledInput(
                'fixedRowCount',
                this._createEventHandler('fixedRowCount', val => {
                  return val > rows.length - 1 ? rows.length - 1 : val;
                }),
              )}
              {this._createLabeledInput(
                'scrollToColumn',
                this._onScrollToColumnChange,
              )}
              {this._createLabeledInput('scrollToRow', this._onScrollToRowChange)}
              {this._createLabeledInput('rowCount', this._onScrollRowCountChange)}
              {this._createLabeledInput(
                'columnCount',
                this._onScrollColumnCountChange,
              )}
              {this._createLabeledCheckBox('autoSort', event => {
                this.setState({ autoSort: event.target.checked });
              })}
              {this._createLabeledCheckBox('multiple', event => {
                this.setState({ multiple: event.target.checked });
              })}
              {this._createLabeledCheckBox(
                'multipleShiftMode',
                event => {
                  this.setState({ multipleShiftMode: event.target.checked });
                },
                !multiple,
              )}
              {this._createLabeledCheckBox('sortableColumn', event => {
                this.setState({ sortableColumn: event.target.checked });
              })}
              {this._createLabeledCheckBox('resizeColumn', event => {
                this.setState({ resizeColumn: event.target.checked });
              })}
            </InputRow>
          )
        }

        {
          showParams && (
            <Container style={{ marginTop: 5 }}>
              <FormLabel
                label="value:"
                inline
                contentClassName={styles.textEllipsis}>
                <div className={styles.textEllipsis}>
                  <code>{JSON.stringify(value.value, undefined, 2)}</code>
                </div>
              </FormLabel>
              <Container inline>
                <FormLabel label="index:" inline>
                  {value.index}
                </FormLabel>
                <FormLabel label="dataKey:" inline>
                  {value.dataKey}
                </FormLabel>
                {Array.isArray(value.value) && (
                  <FormLabel label="selected items:" inline>
                    {value.value.length}
                  </FormLabel>
                )}
              </Container>
              <FormLabel label="rowData:" inline>
                <code>{JSON.stringify(value.rowData, undefined, 2)}</code>
              </FormLabel>
              <FormLabel label="sortBy:" inline>
                <code>{JSON.stringify(sortBy, undefined, 2)}</code>
              </FormLabel>
              <FormLabel label="scroll:" inline>
                <code style={{ fontSize: 10 }}>{JSON.stringify(scroll, undefined, 2)}</code>
              </FormLabel>
            </Container>
          )
        }

        <div style={{ width: '100%', height: 360, marginTop: 10 }}>
          <MultiGridTable
            fixedColumnCount={fixedColumnCount}
            fixedRowCount={fixedRowCount}
            scrollToColumn={scrollToColumn}
            scrollToRow={scrollToRow}
            rows={rows}
            columns={columns}
            value={value.value}
            multiple={currentMultiple}
            classNameCell={(id, rowData, rowIndex) => {
              return `row-cell-${rowIndex}`;
            }}
            onRowClick={(value, rowData, rowIndex, columnKey, event) => {
              this.setState({
                value: {
                  value,
                  rowData,
                  index: rowIndex,
                  dataKey: columnKey,
                },
              });
            }}
            onHeaderRowClick={({ sortBy, sortDirection }) => {
              this.setState({
                sortBy: {
                  sortBy,
                  sortDirection,
                },
              });
            }}
            onScroll={({
              clientHeight,
              clientWidth,
              scrollHeight,
              scrollLeft,
              scrollTop,
              scrollWidth,
            }) => {
              this.setState({
                scroll: {
                  clientHeight,
                  clientWidth,
                  scrollHeight,
                  scrollLeft,
                  scrollTop,
                  scrollWidth,
                },
              });
            }}
            sorter={autoSort ? undefined : false}
            sortBy={sortBy.sortBy}
            sortDirection={sortBy.sortDirection}
            sortableColumn={sortableColumn}
            resizeColumn={resizeColumn}
            onTableChange={(newColumns) => {
              console.log('New Columns: ', newColumns);
            }}
          />
        </div>
      </ContentBox>
    );
  }
}
