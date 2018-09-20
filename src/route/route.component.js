import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UrlPattern from 'url-pattern';

import { RouterConsumer } from '../router/router.context';
import { RouteProvider } from './route.context';


export class Route extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOf([PropTypes.node, PropTypes.func]).isRequired,
    path: PropTypes.string.isRequired,
  };

  pathPattern = new UrlPattern(this.props.path);

  shouldRenderChildren(location) {
    return this.pathPattern.match(location.pathname) !== null;
  }

  renderChildren(location) {
    const params = this.pathPattern.match(location.pathname);
    const { children } = this.props;

    if (typeof children === 'function') {
      return (
        <RouteProvider value={{ params }}>
          {children(this.shouldRenderChildren(location))}
        </RouteProvider>
      );
    }

    if (this.shouldRenderChildren(location)) {
      return (
        <RouteProvider value={{ params }}>
          {children}
        </RouteProvider>
      );
    }

    return null;
  }


  render() {
    return (
      <RouterConsumer>
        {({ location }) => this.renderChildren(location)}
      </RouterConsumer>
    );
  }
}
