'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.actionStateReducer = actionStateReducer;

var _constants = require('./constants');

function actionStateReducer(state = {}, reduxAction = {}) {
  const { payload, type } = reduxAction;
  const actionwareType = reduxAction.actionType;

  if (!actionwareType) return state;

  let nextState = state;
  switch (type) {
    case actionwareType + _constants.ERROR_TYPE:
      nextState = _extends({}, state, {
        [actionwareType + _constants.ERROR_TYPE]: payload,
        [actionwareType + _constants.BUSY_TYPE]: false
      });
      break;

    case actionwareType + _constants.BUSY_TYPE:
      nextState = _extends({}, state, {
        [actionwareType + _constants.ERROR_TYPE]: null,
        [actionwareType + _constants.BUSY_TYPE]: true
      });
      break;

    case actionwareType + _constants.SUCCESS_TYPE:
      nextState = _extends({}, state, {
        [actionwareType + _constants.BUSY_TYPE]: null,
        [actionwareType + _constants.ERROR_TYPE]: false
      });
      break;
    default:
      nextState = state;
      break;
  }

  return nextState;
}