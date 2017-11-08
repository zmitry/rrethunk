import { BUSY_TYPE, SUCCESS_TYPE, CANCEL_TYPE, ERROR_TYPE } from './constants'

/* eslint-disable consistent-return */

const actionCreator = (type, meta) => (payload, extraMeta) => ({
  type,
  payload,
  meta: { ...meta, extraMeta },
})
/**
 * make plain action
 *
 * @param {function} action // function with info
 * @param {Array} args //arguments
 * @param {object} res // payload
 */
const makePlainAction = (action, args, res) => ({
  type: action._successType,
  payload: res,
})

const makeAsyncAction = (action, args, thunk, meta) => (dispatch, getState, extraArguments) => {
  dispatch({
    type: action._busyType,
    args,
    meta,
    actionType: action.baseType,
  })
  const res = thunk(dispatch, getState, extraArguments)
  let canceled = false

  if (res instanceof Promise) {
    const response = res
      .then((el) => {
        if (!canceled) {
          dispatch({
            type: action._successType,
            actionType: action.baseType,
            payload: el,
            meta,
          })
          return el
        }
      })
      .catch((error) => {
        if (!canceled) {
          dispatch({
            type: action._errorType,
            payload: error,
            args,
            meta,
            actionType: action.baseType,
          })
          return Promise.reject(error)
        }
        return Promise.reject(error)
      })
    response.cancel = (payload) => {
      canceled = true
      dispatch({
        type: action._cancelType,
        payload,
        args,
        actionType: action.baseType,
      })
      return !canceled
    }
    return response
  }
  else if (typeof res !== 'undefined') {
    return dispatch({
      type: action._successType,
      actionType: action.baseType,
      payload: res,
      meta,
    })
  }
}

/* eslint-disable no-param-reassign */

const setActions = (fn, prefix, fnName = fn.name, metaInfo) => {
  const actionName = (prefix || '') + fnName

  fn.baseType = actionName
  fn._successType = actionName + SUCCESS_TYPE
  fn._busyType = actionName + BUSY_TYPE
  fn._errorType = actionName + ERROR_TYPE
  fn._cancellationType = actionName + CANCEL_TYPE
  fn.success = actionCreator(fn._successType, metaInfo)
  fn.error = actionCreator(fn._errorType, metaInfo)
  fn.loading = actionCreator(fn._busyType, metaInfo)
  return fn
}

/* eslint-enable no-param-reassign */

export function createAction(fn, fnName = fn.name, { prefix, meta } = {}) {
  if (fn.baseType) {
    return fn
  }

  function action(...args) {
    const res = fn(...args)
    let metaInfo = meta
    if (typeof meta === 'function') {
      metaInfo = meta(...args)
    }
    let reduxAction
    if (typeof res === 'function') {
      reduxAction = makeAsyncAction(action, args, res, metaInfo)
      setActions(reduxAction, prefix, fnName, metaInfo)
    }
    else {
      reduxAction = makePlainAction(action, args, res)
    }
    reduxAction.meta = metaInfo
    return reduxAction
  }

  return setActions(action, prefix, fnName, meta)
}

export const createActions = (actions, params) => {
  const res = Object.keys(actions).reduce((acc, el) => {
    acc[el] = createAction(actions[el], actions[el].name, params)
    return acc
  }, {})
  return res
}
