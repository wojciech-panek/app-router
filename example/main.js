import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import 'babel-polyfill';

import './main.css';
import logo from './images/logo.png';
import { Router, Route, Link, WithRouter, TransitionRoute } from '../src';
import { Modal } from './modal';

class ExampleApp extends PureComponent {
  renderRouteInfo() {
    return (
      <WithRouter>
        {({ location, params }) => (
          <div>
            location: { location.pathname } <br />
            params: { JSON.stringify(params) } <br />
          </div>
        )}
      </WithRouter>
    );
  }

  render() {
    return (
      <Router>
        <Route path="/">
          <div className="route__container route__container--dark">
            <img src={logo} className="route__logo" />
            <div className="route__content">
              <div className="route__title route__title--light">Example route 1</div>
              <Link className="route__button route__button--light" to="/product/1">Change route</Link>
              <Link className="route__button route__button--light" to="/modal">Go to modal</Link>
              <Link className="route__button route__button--light" to="/transition">Go to transition route</Link>
            </div>
            <pre className="route__code">{this.renderRouteInfo()}</pre>
          </div>
        </Route>
        <Route path="/product(/:id)">
          <div className="route__container route__container--light">
            <img src={logo} className="route__logo" />
            <div className="route__content">
              <div className="route__title route__title--dark">Example route 2</div>
              <Link className="route__button route__button--dark" to="/">Go back</Link>
            </div>
            <pre className="route__code">{this.renderRouteInfo()}</pre>
          </div>
        </Route>
        <Route path="/modal">
          <div className="route__container route__container--dark">
            <img src={logo} className="route__logo" />
            <div className="route__content">
              <Modal />
            </div>
            <pre className="route__code">{this.renderRouteInfo()}</pre>
          </div>
        </Route>
        <TransitionRoute path="/transition">
          <div className="route__container route__container--light">
            <img src={logo} className="route__logo" />
            <div className="route__content">
              <div className="route__title route__title--dark">Transition route</div>
              <Link className="route__button route__button--dark" to="/product/1">Go to route 1</Link>
            </div>
            <pre className="route__code">{this.renderRouteInfo()}</pre>
          </div>
        </TransitionRoute>
      </Router>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <ExampleApp />,
    document.getElementById('app')
  );
};

render();
