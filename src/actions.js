import { BUSY_TYPE, SUCCESS_TYPE, CANCEL_TYPE, ERROR_TYPE } from './constants';

/**
 * make plain action
 * 
 * @param {function} action // function with info
 * @param {Array} args //arguments
 * @param {object} res // payload 
 */
const makePlainAction = (action, args, res) => {
	return { type: action._successType, payload: res };
};

const makeAsyncAction = (action, args, thunk, meta) => (
	dispatch,
	getState,
	extraArguments
) => {
	dispatch({
		type: action._busyType,
		args: args,
		meta,
		actionType: action.baseType
	});
	const res = thunk(dispatch, getState, extraArguments);
	let canceled = false;
	if (res instanceof Promise) {
		const response = res
			.then(el => {
				if (!canceled) {
					dispatch({
						type: action._successType,
						actionType: action.baseType,
						payload: el,
						meta
					});
					return el;
				}
			})
			.catch(el => {
				if (!canceled) {
					dispatch({
						type: action._errorType,
						payload: el,
						actionType: action.baseType
					});
					return Promise.reject(el);
				}
				return Promise.reject(el);
			});
		response.cancel = args => {
			canceled = true;
			!canceled &&
				dispatch({
					type: action._cancelType,
					payload: args,
					actionType: action.baseType
				});
			return !canceled;
		};
		return response;
	} else if (typeof res !== 'undefined') {
		return dispatch({
			type: action._successType,
			actionType: action.baseType,
			payload: res,
			meta
		});
	}
};

const setActions = (fn, prefix, fnName = fn.name) => {
	const actionName = (prefix ? prefix : '') + fnName;
	fn.baseType = actionName;
	fn._successType = actionName + SUCCESS_TYPE;
	fn._busyType = actionName + BUSY_TYPE;
	fn._errorType = actionName + ERROR_TYPE;
	fn._cancellationType = actionName + CANCEL_TYPE;
	return fn;
};

export function createAction(fn, fnName = fn.name, { prefix, meta } = {}) {
	if (fn.baseType) {
		return fn;
	}
	function action() {
		const res = fn.apply(null, arguments);
		let metaInfo = meta;
		if (typeof meta === 'function') {
			metaInfo = meta.apply(null, arguments);
		}
		let reduxAction;
		if (typeof res === 'function') {
			reduxAction = makeAsyncAction(action, arguments, res, metaInfo);
			setActions(reduxAction, prefix, fnName, metaInfo);
		} else {
			reduxAction = makePlainAction(action, arguments, res);
		}
		reduxAction.meta = metaInfo;
		return reduxAction;
	}

	return setActions(action, prefix, fnName);
}

export const createActions = (actions, params) => {
	const res = Object.keys(actions).reduce((acc, el) => {
		acc[el] = createAction(actions[el], actions[el].name, params);
		return acc;
	}, {});
	return res;
};
