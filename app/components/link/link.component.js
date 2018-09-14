import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { RouterConsumer } from '../router/router.context';


export class Link extends PureComponent {
  static propTypes = {
    to: PropTypes.node.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  handleLinkClick = (push, event) => {
    event.preventDefault();
    push(this.props.to);
  };

  render() {
    const { to, className, children } = this.props;

    return (
      <RouterConsumer>
        {({ push }) => (
          <a
            className={className}
            href={to}
            onClick={(event) => this.handleLinkClick(push, event)}
          >
            {children}
          </a>
        )}
      </RouterConsumer>
    );
  }
}
