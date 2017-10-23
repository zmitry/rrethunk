import { BUSY_TYPE, ERROR_TYPE, SUCCESS_TYPE } from './constants';

export function actionStateReducer(state = {}, reduxAction) {
	const payload = reduxAction.payload;
	const actionwareType = reduxAction.actionType;
	const type = reduxAction.type;

	if (!actionwareType) return state;

	let nextState = state;
	switch (type) {
		case actionwareType + ERROR_TYPE:
			nextState = {
				...state,
				[actionwareType + ERROR_TYPE]: payload,
				[actionwareType + BUSY_TYPE]: false
			};
			break;

		case actionwareType + BUSY_TYPE:
			nextState = {
				...state,
				[actionwareType + ERROR_TYPE]: null,
				[actionwareType + BUSY_TYPE]: true
			};
			break;

		case actionwareType + SUCCESS_TYPE:
			nextState = {
				...state,
				[actionwareType + BUSY_TYPE]: null,
				[actionwareType + ERROR_TYPE]: false
			};
			break;
		default:
			nextState = state;
			break;
	}

	return nextState;
}
