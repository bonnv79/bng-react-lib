import React from 'react';
import PropTypes from 'prop-types';
import { MultiGrid as MultiGridVirtualized } from 'react-virtualized';

class MultiGrid extends React.Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  componentDidUpdate() {
    const { prevWidth, width, setPrevWidth } = this.props;

    if (prevWidth !== width) {
      this.resizeWidth();
      setPrevWidth(width);
    }
  }

  resizeWidth = () => {
    if (this.gridRef) {
      this.gridRef.recomputeGridSize();
    }
  }

  render() {
    return (
      <MultiGridVirtualized
        ref={(ref) => {
          this.gridRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

MultiGrid.propTypes = {
  prevWidth: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  setPrevWidth: PropTypes.func.isRequired
};

export default MultiGrid;