import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, MultiGrid as MultiGridVirtualized } from 'react-virtualized';
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

class MultiGrid extends React.PureComponent {
  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <div className={styles.cell} key={key} style={style}>
        {columnIndex}, {rowIndex}
      </div>
    );
  }

  render() {
    const { ...props } = this.props;
    return (
      <AutoSizer disableHeight={false}>
        {({ width, height }) => (
          <MultiGridVirtualized
            {...props}
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
            columnWidth={75}
            columnCount={50}
            rowCount={100}
            cellRenderer={this.cellRenderer}
          />
        )}
      </AutoSizer>
    );
  }
}

MultiGrid.defaultProps = {
  fixedColumnCount: 0,
  fixedRowCount: 1,
  scrollToColumn: 0,
  scrollToRow: 0,
  rowHeight: 40
};

MultiGrid.propTypes = {
  fixedColumnCount: PropTypes.number,
  fixedRowCount: PropTypes.number,
  scrollToColumn: PropTypes.number,
  scrollToRow: PropTypes.number,
};

export default MultiGrid;