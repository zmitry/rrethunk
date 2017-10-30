'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = createReducer;

var _lodashEs = require('lodash-es');

var _constants = require('./constants');

function addHandler(reducer, handlers, typifier, initialState, ...args) {
  if (args.length < 2) {
    throw new Error('You should provide at least an action and a handler');
  }

  const handler = args[args.length - 1];
  const types = args.slice(0, args.length - 1);

  if (typeof handler !== 'function') {
    throw new TypeError('Handler should be a function');
  }

  types.forEach(it => {
    switch (typeof it) {
      case 'string':
        handlers[it] = handler; // eslint-disable-line no-param-reassign
        break;

      case 'function':
        handlers[typifier(it)] = handler; // eslint-disable-line no-param-reassign
        break;

      default:
        throw new Error('Invalid action/action type, \n you probably added undefined action to reducer');
    }
  });

  return reducer;
}

function createReducer(initialState = {}, defaultReducer = _lodashEs.identity) {
  const handlers = {};

  const reducer = (state = initialState, action) => {
    const { type, payload, args, meta } = action || {};
    if (handlers[type]) {
      const handler = handlers[type];
      if (type.endsWith(_constants.BUSY_TYPE)) {
        return handler.apply(null, [state, ...args]);
      }

      if (type.endsWith(_constants.ERROR_TYPE) || type.endsWith(_constants.CANCEL_TYPE)) {
        return handler.apply(null, [state, payload, ...args]);
      }

      return handler(state, payload, meta);
    }
    return defaultReducer(state, action);
  };

  reducer.on = addHandler.bind(null, reducer, handlers, (0, _lodashEs.property)('_successType'), initialState);
  reducer.onError = addHandler.bind(null, reducer, handlers, (0, _lodashEs.property)('_errorType'), initialState);
  reducer.before = addHandler.bind(null, reducer, handlers, (0, _lodashEs.property)('_busyType'), initialState);

  reducer.cancel = addHandler.bind(null, reducer, handlers, (0, _lodashEs.property)('_cancellationType'), initialState);
  return reducer;
}