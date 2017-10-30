'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineReducers = undefined;

var _redux = require('redux');

var _reducer = require('./reducer');

const combineReducers = exports.combineReducers = reducers => {
  const combinedReducer = (0, _redux.combineReducers)(reducers);
  return (0, _reducer.createReducer)({}, combinedReducer);
};