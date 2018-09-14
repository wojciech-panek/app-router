import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UrlPattern from 'url-pattern';

import { RouterConsumer } from '../router/router.context';
import { RouteProvider } from './route.context';


export class Route extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired,
  };

  pathPattern = new UrlPattern(this.props.path);

  shouldRenderChildren(location) {
    return this.pathPattern.match(location.pathname) !== null;
  }

  renderChildren(location) {
    const params = this.pathPattern.match(location.pathname);

    return (
      <RouteProvider value={{ params }}>
        {this.props.children}
      </RouteProvider>
    );
  }

  render() {
    return (
      <RouterConsumer>
        {({ location }) => this.shouldRenderChildren(location) ? this.renderChildren(location) : null}
      </RouterConsumer>
    );
  }
}
