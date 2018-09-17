import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import { Router, Route, Link, WithRouter } from './components';

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
      <div>
        <Router>
          <Route path="/">
            <div>route 1</div>
            <div>{this.renderRouteInfo()}</div>
            <Link to="/product/1">go to route 2</Link>
          </Route>
          <Route path="/product(/:id)">
            <div>route 2</div>
            <div>{this.renderRouteInfo()}</div>
            <Link to="/">go to route 1</Link>
          </Route>
        </Router>
      </div>
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
