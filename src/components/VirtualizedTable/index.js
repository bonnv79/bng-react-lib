import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { AutoSizer, Column, Table } from 'react-virtualized';
import styles from './styles';

const keyBy = (array) => {
  const objects = {};
  if (Array.isArray(array)) {
    array.forEach(key => {
      objects[key] = true;
    });
  }
  return objects;
};

class VirtualizedTable extends React.PureComponent {
  state = {
    selectedItems: ''
  }

  static defaultProps = {
    headerHeight: 40,
    rowHeight: 40,
    rowKey: 'id',
    multi: false,
    selectedItems: '',
    rows: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.selectedItems !== state.selectedItems) {
      return {
        selectedItems: props.multi ? keyBy(props.selectedItems) : props.selectedItems
      };
    }
    return null;
  }

  getIdByIndex = (index) => {
    const { rows, rowKey } = this.props;
    return rows[index] ? rows[index][rowKey] : null;
  }

  getRowClassName = ({ index }) => {
    const { classes, onRowClick, multi } = this.props;
    const { selectedItems } = this.state;
    let selected = false;

    if (selectedItems) {
      const id = this.getIdByIndex(index);
      selected = multi ? selectedItems[id] : selectedItems === id;
    }

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
      [classes.selectedItem]: selected,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <div
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        <span>{cellData}</span>
      </div>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <div
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </div>
    );
  };

  onRowClick = ({ event, index, rowData }) => {
    const { onRowClick, multi } = this.props;
    const id = this.getIdByIndex(index);
    let newValue = id;

    if (multi) {
      const { selectedItems } = this.state;
      newValue = typeof selectedItems === 'object' ? selectedItems : {};

      if (newValue[id]) {
        delete newValue[id];
      } else {
        newValue[id] = true;
      }

      newValue = Object.keys(newValue);
    }

    onRowClick(newValue, rowData, index, event);
  }

  render() {
    const { classes, columns, rowHeight, headerHeight, rows, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            {...tableProps}
            rowClassName={this.getRowClassName}
            onRowClick={this.onRowClick}
          >
            {columns.map(({ dataKey, flexGrow = 1, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  flexGrow={flexGrow}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

VirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  rowKey: PropTypes.string,
  multi: PropTypes.bool,
  selectedItems: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  onRowClick: PropTypes.func,
  rows: PropTypes.arrayOf(Object)
};

export default withStyles(styles)(VirtualizedTable);



