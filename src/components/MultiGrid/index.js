import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import _orderBy from 'lodash/orderBy';
import MultiGridVirtualized from './MultiGrid';
import styles from './styles.module.css';
import clsx from 'clsx';
import {
  STYLE,
  STYLE_BOTTOM_LEFT_GRID,
  STYLE_TOP_LEFT_GRID, STYLE_TOP_RIGHT_GRID,
  OPPOSITION_ORDER_BY,
  ORDER_BY,
  DEFAULT_COLUMN_WIDTH
} from './constants';

const getMapColumns = (columns) => {
  let totalWidth = 0;

  columns.forEach((col, index) => {
    let { width } = col;
    width = Number(width) || DEFAULT_COLUMN_WIDTH;
    columns[index].width = width;
    totalWidth += width;
  });

  columns.forEach((col, index) => {
    const { width } = col;
    columns[index].percent = Math.round((width / totalWidth) * 100) / 100;
  });

  return columns;
};

class MultiGrid extends React.Component {
  state = {
    columns: [],
    prevRows: [],
    rows: [],
    sortBy: '',
    orderBy: '',
    hover: '',
    prevWidth: 0
  }

  static getDerivedStateFromProps(props, state) {
    if (props.columns !== state.columns || props.rows !== state.prevRows) {
      return {
        columns: getMapColumns(props.columns),
        prevRows: props.rows,
        rows: props.rows,
      };
    }
    return null;
  }

  changeSort = (sortBy) => () => {
    const { sortBy: prevSortBy, orderBy: prevOrderBy, rows } = this.state;
    const orderBy = sortBy === prevSortBy ? OPPOSITION_ORDER_BY[prevOrderBy] : ORDER_BY.ASC;

    this.setState({
      sortBy,
      orderBy,
      rows: _orderBy(rows, [sortBy], [orderBy])
    });
  }

  onRowClick = (rowData, dataKey, index) => () => {
    const { onRowClick, rowKey } = this.props;
    const value = rowData[rowKey];
    onRowClick(value, rowData, index, dataKey);
  }

  onHoverCell = (rowIndex) => () => {
    this.setState({
      hover: rowIndex
    });
  }

  headerCellRenderer = ({ key, columnIndex, style }) => {
    const { columns, sortBy, orderBy } = this.state;
    const { dataKey, label, sort } = columns[columnIndex];
    const isSort = sortBy === dataKey;
    const ascSort = orderBy === ORDER_BY.ASC;

    return (
      <div key={key} className={styles.cell} style={style}>
        <span
          title={label}
          className={clsx(styles.nonePointerEvents, { [styles.sortBy]: sort }, { [styles.ascSort]: isSort && ascSort, [styles.descSort]: isSort && !ascSort })}
          onClick={this.changeSort(dataKey)}
        >
          {label}
        </span>
      </div>
    );
  }

  cellRenderer = ({ key, columnIndex, rowIndex, style }) => {
    if (rowIndex === 0) {
      return this.headerCellRenderer({ key, columnIndex, style, rowIndex });
    }

    const { value, rowKey } = this.props;
    const { rows, columns, hover } = this.state;
    const { dataKey, align } = columns[columnIndex];
    const rowData = rows[rowIndex - 1];
    const label = rowData[dataKey];
    const id = rowData[rowKey];

    return (
      <div
        key={key}
        className={clsx(
          styles.cell,
          styles[align],
          {
            [styles.cellHover]: hover === rowIndex,
            [styles.cellSelected]: value === id
          }
        )}
        style={style}
        onClick={this.onRowClick(rowData, dataKey, rowIndex)}
        onMouseEnter={this.onHoverCell(rowIndex)}
      >
        <span title={label}>{label}</span>
      </div>
    );
  }

  getColumnWidth = (gridWidth) => ({ index }) => {
    const { columns } = this.state;
    const { width, percent } = columns[index];

    return Math.max(gridWidth * percent, width);
  }

  setPrevWidth = (width) => {
    this.setState({
      prevWidth: width
    });
  }

  render() {
    const { fixedRowCount, ...props } = this.props;
    const { rows, columns, prevWidth } = this.state;

    return (
      <AutoSizer>
        {({ width, height }) => (
          <MultiGridVirtualized
            height={height}
            width={width}
            enableFixedColumnScroll
            enableFixedRowScroll
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
            style={STYLE}
            styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
            styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
            styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
            fixedRowCount={fixedRowCount + 1}
            columnCount={columns.length}
            columnWidth={this.getColumnWidth(width)}
            rowCount={rows.length + 1}
            cellRenderer={this.cellRenderer}
            prevWidth={prevWidth}
            setPrevWidth={this.setPrevWidth}
            {...props}
          />
        )}
      </AutoSizer>
    );
  }
}

MultiGrid.defaultProps = {
  fixedColumnCount: 0,
  fixedRowCount: 0,
  scrollToColumn: 0,
  scrollToRow: 0,
  rowHeight: 40,
  onRowClick: () => { },
  rowKey: 'id',
  value: ''
};

MultiGrid.propTypes = {
  rows: PropTypes.arrayOf(Object).isRequired,
  columns: PropTypes.arrayOf(Object).isRequired,
  fixedColumnCount: PropTypes.number,
  fixedRowCount: PropTypes.number,
  scrollToColumn: PropTypes.number,
  scrollToRow: PropTypes.number,
  onRowClick: PropTypes.func,
  rowKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default MultiGrid;