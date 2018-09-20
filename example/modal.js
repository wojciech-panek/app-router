import React from 'react';
import { WithRouter, PortalRoute } from '../src';

export class Modal extends React.PureComponent {
  state = {
    counter: 0,
    showWindowPortal: false,
  };

  componentDidMount() {
    window.addEventListener('beforeunload', () => {
      this.closeWindowPortal();
    });
  }

  toggleWindowPortal = () => {
    this.setState(state => ({
      ...state,
      showWindowPortal: !state.showWindowPortal,
    }));

    window.setTimeout(() => {
      this.forceUpdate();
    }, 100);
  };

  closeWindowPortal = () => this.setState({ showWindowPortal: false });

  render() {
    return (
      <div>
        <button className="route__button route__button--light" onClick={this.toggleWindowPortal}>
          {this.state.showWindowPortal ? 'Close the' : 'Open a'} Portal
        </button>

        {this.state.showWindowPortal && (
          <PortalRoute>
            <div className="route__container route__container--dark">

              <WithRouter>
                {({ push }) => (
                  <button className="route__button route__button--light" onClick={() => push('product/2')} >
                    Change route in the app
                  </button>
                )}
              </WithRouter>
              <button className="route__button route__button--light" onClick={() => this.closeWindowPortal()} >
                Close me!
              </button>
            </div>
          </PortalRoute>
        )}
      </div>
    );
  }
}
