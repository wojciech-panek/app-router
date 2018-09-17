import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { RouterConsumer } from '../router/router.context';
import { RouteConsumer } from '../route/route.context';

export class WithRouter extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    return (
      <RouterConsumer>
        {({ location, push, replace }) => (
          <RouteConsumer>
            {({ params }) => this.props.children({ location, push, replace, params })}
          </RouteConsumer>
        )}
      </RouterConsumer>
    );
  }
}
