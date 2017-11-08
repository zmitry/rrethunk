import { createReducer, combineReducers } from "rrethunk";
import actions from "./actions";

const remove = (state, id) => state.filter(el => el !== id);
const todosById = createReducer([])
  .on(actions.fetchTodo, (state, newState) => newState.result)
  .before(actions.createTodo, (state, { id }) => [...state, id])
  .on(actions.createTodo, (state, payload) =>
    remove(state, payload.tempId).concat(payload.data.id)
  )
  .on(actions.removeTodo, (state, payload) => remove(state, payload.id))
  .onError(actions.createTodo, (state, payload, args) =>
    remove(state, args.id)
  );

const todoReducer = createReducer({})
  .on(actions.fetchTodo, (state, newState) => ({
    ...state,
    ...newState.entities.todo
  }))
  .before(actions.createTodo, (state, { data, id }) => {
    return {
      ...state,
      [id]: { ...data, id, loading: true }
    };
  })
  .on(actions.createTodo, (state, payload) => ({
    ...state,
    [payload.tempId]: null,
    [payload.data.id]: payload.data
  }))
  .onError(actions.createTodo, (state, payload, args) => {
    return {
      ...state,
      [args.id]: null
    };
  })
  .on(actions.removeTodo, (state, payload) => ({
    ...state,
    [payload.id]: null
  }))
  .before(actions.toggleTodo, (state, payload) => ({
    ...state,
    [payload.id]: { ...state[payload.id], loading: true }
  }))
  .on(actions.toggleTodo, (state, payload) => ({
    ...state,
    [payload.id]: { ...payload, loading: false }
  }));

const getTodoReducer = type => {
  return (state = [], action) => {
    if (action.meta && action.meta.reducerKey === type) {
      return todosById(state, action);
    }
    return state;
  };
};

export const reducer = combineReducers({
  todoData: todoReducer,
  all: getTodoReducer("all"),
  done: getTodoReducer("done"),
  todo: getTodoReducer("todo")
}).on(actions.clearTodos, state => reducer({}, {}));

export default reducer;
