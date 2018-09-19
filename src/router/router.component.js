import React, { PureComponent, StrictMode } from 'react';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';

import { RouterProvider } from './router.context';

export class Router extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    strictMode: PropTypes.bool.isRequired,
    errorRoute: PropTypes.node,
    errorHandler: PropTypes.func,
  };

  static defaultErrorHandler = console.error;

  static defaultProps = {
    strictMode: false,
    errorHandler: Router.defaultErrorHandler,
  };

  constructor(props) {
    super(props);

    this.history = createHistory();
    this.history.listen(this.handleHistoryChange);

    this.state = {
      location: this.history.location,
      push: this.history.push,
      replace: this.history.replace,
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    this.props.errorHandler(error, info);
  }

  handleHistoryChange = (location) => this.setState({ location });

  wrapInStrictMode(children) {
    if (this.props.strictMode) {
      return <StrictMode>{children}</StrictMode>;
    }

    return children;
  }

  renderError() {
    if (this.props.errorRoute) {
      return this.props.errorRoute;
    }

    return null;
  }

  renderChildren() {
    const children = this.state.hasError ? this.renderError() : this.props.children;

    if (this.props.strictMode) {
      return <StrictMode>{children}</StrictMode>;
    }

    return children;
  }

  render() {
    return (
      <RouterProvider value={this.state}>
        {this.renderChildren()}
      </RouterProvider>
    );
  }
}
