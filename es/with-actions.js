'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withActionsConnect = exports.withActions = undefined;

var _redux = require('redux');

var _reactRedux = require('react-redux');

const withActions = exports.withActions = (actions, propName) => {
  let mapDispatch = dispatch => (0, _redux.bindActionCreators)(actions, dispatch);
  if (propName) {
    mapDispatch = dispatch => ({
      actions: (0, _redux.bindActionCreators)(actions, dispatch)
    });
  }
  return (0, _reactRedux.connect)(null, mapDispatch);
};

const withActionsConnect = exports.withActionsConnect = (actions, propsName = 'actions') => dispatch => ({
  [propsName]: (0, _redux.bindActionCreators)(actions, dispatch)
});