import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from './FileExplorerTheme/index';

/**
 * 
 * @param { isOver, canDrop } props 
 * @returns 
 */
const PlaceholderRendererDefault = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      No data found
    </div>
  );
};

class ReactSortableTree extends Component {
  constructor(props) {
    super(props);
    const { treeData } = props;
    this.state = {
      originalTreeData: treeData,
      treeData,
      expanded: null,
    };

    this.updateTreeData = this.updateTreeData.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (props.treeData !== state.originalTreeData) {
      newState.originalTreeData = props.treeData;
      newState.treeData = props.treeData;
    }
    if (props.expanded !== state.expanded) {
      newState.treeData = toggleExpandedForAll({
        treeData: state.treeData,
        expanded: props.expanded,
      });
      newState.expanded = props.expanded;
    }
    return newState;
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  onClickNode = (rowInfo) => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick({ ...rowInfo, id: rowInfo.node.id });
    }
  }

  /**
   * 
   * @param {node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus} rowInfo 
   * @returns {}
   */
  generateNodeProps = rowInfo => {
    const { value, generateNodeProps } = this.props;
    const props = typeof generateNodeProps === 'function' ? generateNodeProps(rowInfo) : {};
    const selected = rowInfo.node.id === value;

    return {
      onClickNode: () => {
        this.onClickNode(rowInfo);
      },
      selected,
      ...props,
    };
  }

  /**
   * 
   * @param {treeData, node, nextParentNode, prevPath, prevTreeIndex, path, treeIndex} rowInfo 
   */
  onMoveNode = (rowInfo) => {
    const { onMoveNode } = this.props;
    if (typeof onMoveNode === 'function') {
      onMoveNode(rowInfo);
    }
  }

  render() {
    const {
      searchQuery,
      searchFocusOffset,
      searchFinishCallback,
      maxDepth,
      rowHeight,
      scaffoldBlockPxWidth,
      placeholderRenderer,
      className,
    } = this.props;
    const { treeData } = this.state;

    return (
      <SortableTree
        className={className}
        theme={FileExplorerTheme}
        treeData={treeData}
        rowHeight={rowHeight}
        maxDepth={maxDepth}
        scaffoldBlockPxWidth={scaffoldBlockPxWidth}
        onChange={this.updateTreeData}
        searchQuery={searchQuery}
        searchFocusOffset={searchFocusOffset}
        searchFinishCallback={searchFinishCallback}
        canDrag={({ node }) => !node.dragDisabled}
        canDrop={({ nextParent }) => {
          return !nextParent || !nextParent.dropDisabled;
        }}
        generateNodeProps={this.generateNodeProps}
        onMoveNode={this.onMoveNode}
        placeholderRenderer={placeholderRenderer}
      />
    );
  }
}

ReactSortableTree.defaultProps = {
  treeData: [],
  expanded: null,
  searchQuery: '',
  searchFocusOffset: 0,
  searchFinishCallback: undefined,
  onClick: () => { },
  value: '',
  maxDepth: undefined,
  generateNodeProps: null,
  rowHeight: 30,
  onMoveNode: undefined,
  scaffoldBlockPxWidth: 28,
  placeholderRenderer: PlaceholderRendererDefault,
  className: undefined
};

ReactSortableTree.propTypes = {
  treeData: PropTypes.arrayOf(Object),
  expanded: PropTypes.bool,
  searchQuery: PropTypes.string,
  searchFocusOffset: PropTypes.number,
  searchFinishCallback: PropTypes.func,
  onClick: PropTypes.func,
  value: PropTypes.string,
  maxDepth: PropTypes.number,
  generateNodeProps: PropTypes.func,
  rowHeight: PropTypes.number,
  onMoveNode: PropTypes.func,
  scaffoldBlockPxWidth: PropTypes.number,
  placeholderRenderer: PropTypes.any,
  className: PropTypes.string,
};

export default ReactSortableTree;
export { ReactSortableTree };
