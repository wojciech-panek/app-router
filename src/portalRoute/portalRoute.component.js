import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) {
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
      return;
    }

    if (styleSheet.href) {
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

export class PortalRoute extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    onCreate: Function.prototype,
    onClose: Function.prototype,
    top: 200,
    left: 200,
    width: 600,
    height: 400,
  };

  componentDidMount() {
    this.props.onCreate();
    this.externalWindow = window.open('', '', this.getWindowSizeAndPosition());
    this.externalWindow.document.body.appendChild(this.container);
    copyStyles(document, this.externalWindow.document);
  }

  componentWillUnmount() {
    this.props.onClose();
    this.externalWindow.close();
  }

  getWindowSizeAndPosition = () => {
    const { width, height, left, top } = this.props;
    return `width=${width},height=${height},left=${left},top=${top}`;
  };

  container = document.createElement('div');
  externalWindow = null;

  render = () => ReactDOM.createPortal(this.props.children, this.container);
}
