import React, { Fragment } from 'react';
import { Link, PortalRoute } from '../src';

export class Modal extends React.PureComponent {
  state = {
    showWindowPortal: false,
  };

  toggleWindowPortal = () => this.setState(state => ({
    showWindowPortal: !state.showWindowPortal,
  }));

  closeWindowPortal = () => this.setState({ showWindowPortal: false });

  handlePortalCreate = () => this.forceUpdate();

  render() {
    return (
      <Fragment>
        <button className="route__button route__button--light" onClick={this.toggleWindowPortal}>
          {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
        </button>

        {this.state.showWindowPortal && (
          <PortalRoute onCreate={this.handlePortalCreate} width={800} top={150}>
            <div className="route__container route__container--dark">
              <Link className="route__button route__button--light" to="/product/2">Change route</Link>
              <button className="route__button route__button--light" onClick={() => this.closeWindowPortal()} >
                Close me!
              </button>
            </div>
          </PortalRoute>
        )}
      </Fragment>
    );
  }
}
