# app-router [![npm](https://img.shields.io/npm/v/app-router.svg?style=flat-square)](https://www.npmjs.com/package/study-group-app-router)

React router build with React v16

## Installation

### Yarn

```sh
yarn add study-group-app-router
```

### NPM

```sh
npm install --save study-group-app-router
```

## Documentation

### `<Router />`

Required wrapper component which provides context to routes.

#### `strictMode`: PropTypes.bool (default: false)

If provided, children will be wrapped in `React.StrictMode`. 

#### `errorRoute`: PropTypes.node (default: null)

Component which will be rendered after catching an error

#### `errorHandler`: PropTypes.func (default: console.error)

Function which will be used for handling caught errors 

#### `children`: PropTypes.node.isRequired

### `<Route />`

#### `path`: PropTypes.string.isRequired

Url pattern which will determine if certain route is visible. Can contain route variables which will be parsed as route params.

```js
  <Route path="/">route 1<Route />
  <Route path="/post">route 2<Route />
  <Route path="/post/(/:id)">route 3<Route />
```

#### `children`: PropTypes.node.isRequired

### `<Link />`

#### `to`: PropTypes.string.isRequired

Absolute url which will change pathname.

#### `className`: PropTypes.string.isRequired

className which will be passed to DOM link element

#### `target`: PropTypes.string.isRequired

target which will be passed to DOM link element.

#### `children`: PropTypes.node.isRequired

```js
  <Link to="/post/1" className="link">Click me<Link />
```

### `<WithRouter />`

Component which exposes router variables using render prop

#### `children`: PropTypes.function.isRequired

```js
  <WithRouter>{(router) => {...}<WithRouter/>
```

##### `router.location`: browserHistory.location object
##### `router.params`: params parsed using <Route /> url pattern
##### `router.push`: browserHistory.push function
##### `router.replace`: browserHistory.replace function

### `<PortalRoute />`

Component which allows rendering it's children in a new window

#### `onCreate`: PropTypes.func.isRequired

Called after opening modal. Since React doesn't know about inserting new
elements into DOM it's basic implementation has to look as follows:

```js
  <PortalRoute onCreate={() => this.this.forceUpdate()}>
```

#### `onClose`: PropTypes.func

Called after closing modal. 

#### `width`: PropTypes.number

#### `height`: PropTypes.number

#### `top`: PropTypes.number

#### `left`: PropTypes.number

## License

MIT
