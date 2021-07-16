import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import MultiGridVirtualized from './MultiGrid';
import styles from './styles.module.css';

const STYLE = {
  border: '1px solid #ddd',
};
const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
};
const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};
const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};

const getMapColumns = (columns) => {
  let totalWidth = 0;

  columns.forEach((col, index) => {
    let { width } = col;
    width = Number(width) || 100;
    columns[index].width = width;
    totalWidth += width;
  });

  columns.forEach((col, index) => {
    const { width } = col;
    columns[index].percent = Math.round((width / totalWidth) * 100) / 100;
  });

  return columns;
};

const getMapRows = (rows) => {
  return rows;
};

class MultiGrid extends React.Component {
  state = {
    columns: [],
    rows: []
  }

  static getDerivedStateFromProps(props, state) {
    if (props.columns !== state.columns || props.rows !== state.rows) {
      return {
        columns: getMapColumns(props.columns),
        rows: getMapRows(props.rows)
      };
    }
    return null;
  }

  headerCellRenderer = ({ key, columnIndex, style }) => {
    const { columns } = this.state;
    const { label } = columns[columnIndex];

    return (
      <div key={key} className={styles.cell} style={style}>
        <span title={label}>{label}</span>
      </div>
    );
  }

  cellRenderer = ({ key, columnIndex, rowIndex, style }) => {
    if (rowIndex === 0) {
      return this.headerCellRenderer({ key, columnIndex, style, rowIndex });
    }

    const { rows, columns } = this.state;
    const { dataKey } = columns[columnIndex];
    const label = rows[rowIndex - 1][dataKey];

    return (
      <div key={key} className={styles.cell} style={style}>
        <span title={label}>{label}</span>
      </div>
    );
  }

  getColumnWidth = (gridWidth) => ({ index }) => {
    const { columns } = this.state;
    const { width, percent } = columns[index];

    return Math.max(gridWidth * percent, width);
  }

  render() {
    const { fixedRowCount, ...props } = this.props;
    const { rows, columns } = this.state;

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
  rows: [],
  columns: []
};

MultiGrid.propTypes = {
  fixedColumnCount: PropTypes.number,
  fixedRowCount: PropTypes.number,
  scrollToColumn: PropTypes.number,
  scrollToRow: PropTypes.number,
  rows: PropTypes.arrayOf(Object),
  columns: PropTypes.arrayOf(Object)
};

export default MultiGrid;