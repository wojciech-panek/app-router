import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Route } from '../route/route.component';


class BaseTransition extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shouldRender: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: props.shouldRender,
      height: null,
    };
  }

  getSnapshotBeforeUpdate() {
    return this.containerRef.current && this.containerRef.current.clientHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.shouldRender && !this.props.shouldRender) {
      this.setState({ height: snapshot });

      cancelAnimationFrame(this._raf);
      this._raf = requestAnimationFrame(() => {
        this.setState({ height: 0 });
      });
    }

    if (!prevProps.shouldRender && this.props.shouldRender) {
      this.setState({ show: true, height: 0 });

      cancelAnimationFrame(this._raf);
      this._raf = requestAnimationFrame(() => {
        this.setState({ height: this.containerRef.current.clientHeight });
      });
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
  }

  get containerStyle() {
    if (this.state.height !== null) {
      return {
        position: 'absolute',
      };
    }

    return {};
  }

  get wrapperStyle() {
    if (this.state.height !== null) {
      return {
        position: 'relative',
        height: `${this.state.height}px`,
        transition: 'height 500ms ease-out',
        overflow: 'hidden',
      };
    }

    return {};
  }

  containerRef = React.createRef();
  wrapperRef = React.createRef();

  handleTransitionEnd = ({ target }) => {
    if (target === this.wrapperRef.current) {
      this.setState({
        height: null,
        show: this.props.shouldRender,
      });
    }
  };

  render() {
    return this.state.show ? (
      <div ref={this.wrapperRef} onTransitionEnd={this.handleTransitionEnd} style={this.wrapperStyle}>
        <div ref={this.containerRef} style={this.containerStyle}>
          {this.props.children}
        </div>
      </div>
    ) : null;
  }
}

export class TransitionRoute extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    path: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Route path={this.props.path}>
        {(shouldRender) => (
          <BaseTransition shouldRender={shouldRender}>
            {this.props.children}
          </BaseTransition>
        )}
      </Route>
    );
  }
}
