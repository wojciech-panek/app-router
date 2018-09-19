import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if(styleSheet.cssRules) {
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
      return;
    }

    if(styleSheet.href) {
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
  };

  static defaultProps = {
    onCreate: Function.prototype,
    onClose: Function.prototype,
  };

  componentDidMount() {
    this.props.onCreate();
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    this.externalWindow.document.body.appendChild(this.container);
    copyStyles(document, this.externalWindow.document);
  }

  componentWillUnmount() {
    this.props.onClose();
    this.externalWindow.close();
  }

  container = document.createElement('div');
  externalWindow = null;

  render = () => {
    console.log('render');
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}