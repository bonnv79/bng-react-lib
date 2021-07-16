import React from 'react';
import { MultiGrid as MultiGridVirtualized } from 'react-virtualized';

class MultiGrid extends React.Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  componentDidUpdate() {
    this.resizeWidth();
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

export default MultiGrid;