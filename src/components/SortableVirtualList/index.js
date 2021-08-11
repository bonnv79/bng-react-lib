import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { AutoSizer, List } from 'react-virtualized';
import classNames from 'clsx';
import style from './index.scss';

const Handle = SortableHandle(({ tabIndex }) => (
  <div className={style.handle} tabIndex={tabIndex}>
    <span className={style['gg-menu']} />
  </div>
));

const Item = SortableElement(
  ({
    className,
    isDisabled,
    height,
    style: propStyle,
    itemIndex,
    isSorting,
    id,
    children,
    onClick,
    shouldUseDragHandle,
    selected
  }) => {
    const bodyTabIndex = !shouldUseDragHandle ? 0 : -1;
    const handleTabIndex = shouldUseDragHandle ? 0 : -1;

    return (
      <div
        id={id}
        className={classNames(
          className,
          isDisabled && style.disabled,
          isSorting && style.sorting,
          shouldUseDragHandle && style.containsDragHandle,
          selected && style.selected,
        )}
        style={{
          height,
          ...propStyle,
        }}
        tabIndex={bodyTabIndex}
        data-index={itemIndex}
        onClick={onClick}
      >
        {shouldUseDragHandle && <Handle tabIndex={handleTabIndex} />}

        {children}
      </div>
    );
  },
);

class VirtualizedListWrapper extends Component {
  render() {
    const {
      className,
      items,
      height,
      width,
      itemHeight,
      rowHeight,
      rowRenderer
    } = this.props;
    return (
      <List
        className={className}
        rowHeight={rowHeight}
        estimatedRowSize={itemHeight}
        rowRenderer={rowRenderer}
        rowCount={items.length}
        width={width}
        height={height}
      />
    );
  }
}

VirtualizedListWrapper.defaultProps = {
  itemHeight: undefined
};

VirtualizedListWrapper.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  className: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  itemHeight: PropTypes.number,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  rowRenderer: PropTypes.func.isRequired
};

const SortableVirtualizedList = SortableContainer(VirtualizedListWrapper, {
  withRef: true,
});

class SortableVirtualList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      isSorting: false,
    };
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.reloadData(this.props.items);
    }
  }

  reloadData = (items) => {
    this.setState({
      items
    });
  }

  onSortStart = (sortEvent, nativeEvent) => {
    const { onSortStart } = this.props;
    this.setState({ isSorting: true });

    document.body.style.cursor = 'grabbing';

    if (onSortStart) {
      const { items } = this.state;
      const { index } = sortEvent;
      const node = items[index];
      onSortStart({ items, index, node, sortEvent, nativeEvent, container: this.ref.current });
    }
  };

  onSortEnd = (sortEvent, nativeEvent) => {
    const { onSortEnd } = this.props;
    const { oldIndex, newIndex } = sortEvent;
    let { items } = this.state;
    items = arrayMove(items, oldIndex, newIndex);

    this.setState({
      items,
      isSorting: false,
    });

    document.body.style.cursor = '';

    const node = items[newIndex];
    if (onSortEnd) {
      onSortEnd({ items, oldIndex, newIndex, node, sortEvent, nativeEvent, container: this.ref.current });
    }
  };

  onClick = (row) => (e) => {
    const { onClick, valueKey } = this.props;
    if (onClick) {
      const { [valueKey]: id } = row;
      onClick(id, row, e);
    }
  }

  render() {
    const { valueKey, labelKey, itemClass, shouldUseDragHandle, value } = this.props;
    const { items, isSorting } = this.state;
    const props = {
      isSorting,
      items,
      onSortEnd: this.onSortEnd,
      onSortStart: this.onSortStart,
      ref: this.ref,
      useDragHandle: shouldUseDragHandle,
      rowRenderer: ({ key, index, style }) => {
        const { [valueKey]: id, [labelKey]: label, disabled } = items[index] || {};

        return (
          <Item
            key={key}
            id={id}
            label={label}
            index={index}
            itemIndex={index}
            className={itemClass}
            style={style}
            isSorting={isSorting}
            disabled={disabled}
            isDisabled={disabled}
            shouldUseDragHandle={shouldUseDragHandle}
            selected={value && value === id}
            onClick={this.onClick(items[index])}
          >
            {label}
          </Item>
        );
      }
    };

    return (
      <div className={style.root}>
        <AutoSizer>
          {({ height, width }) => (
            <SortableVirtualizedList {...this.props} {...props} height={height} width={width} />
          )}
        </AutoSizer>
      </div>
    );
  }
}

SortableVirtualList.defaultProps = {
  className: style.list,
  itemClass: style.item,
  items: [],
  itemHeight: undefined,
  rowHeight: 40,
  valueKey: 'id',
  labelKey: 'label',
  shouldUseDragHandle: false,
  value: '',
  onSortStart: undefined,
  onSortEnd: undefined,
  onClick: undefined,
};

SortableVirtualList.propTypes = {
  className: PropTypes.string,
  itemClass: PropTypes.string,
  items: PropTypes.arrayOf(Object),
  itemHeight: PropTypes.number,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  shouldUseDragHandle: PropTypes.bool,
  value: PropTypes.string,
  onSortStart: PropTypes.func,
  onSortEnd: PropTypes.func,
  onClick: PropTypes.func,
};

export default SortableVirtualList;
export {
  SortableVirtualList
};