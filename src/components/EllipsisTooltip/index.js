import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';

class EllipsisTooltip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    this.updateTooltip();
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.updateTooltip();
    }
  }

  updateTooltip = () => {
    if (this.ref && this.ref.current) {
      const { offsetWidth, scrollWidth } = this.ref.current;
      const { open } = this.state;
      let currentOpen = offsetWidth < scrollWidth;
      if (open !== currentOpen) {
        this.setState({
          open: currentOpen
        });
      }
    }
  }

  render() {
    const { classes, title, children, ...props } = this.props;
    const { open } = this.state;
    return (
      <div
        ref={this.ref}
        title={open ? title || children : ''}
        className={clsx('tooltip', classes.tooltip)}
        {...props}
      >
        {children}
      </div>
    );
  }
}

EllipsisTooltip.defaultProps = {
  classes: styles,
  title: '',
  children: ''
};

EllipsisTooltip.propTypes = {
  classes: PropTypes.instanceOf(Object),
  title: PropTypes.string,
  children: PropTypes.string
};

export default EllipsisTooltip;
export { EllipsisTooltip };



