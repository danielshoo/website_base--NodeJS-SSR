const IndexPage = require('src/react-pages/index/Index');

const React = require('react');
const ReactDom = require('react-dom/client');

const elmRoot = document.querySelector('.dsr-index');
ReactDom.hydrateRoot(elmRoot, React.createElement(IndexPage));
