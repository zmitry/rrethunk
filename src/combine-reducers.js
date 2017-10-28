import { combineReducers as defaultCombine } from 'redux'
import { createReducer } from './reducer'


export const combineReducers = (reducers) => {
  const combinedReducer = defaultCombine(reducers)
  return createReducer({}, combinedReducer)
}
