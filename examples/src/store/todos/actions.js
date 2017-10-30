import { createActions } from "rrethunk";
import { schema, normalize } from "normalizr";

import selectors from "./selectors";

const todo = new schema.Entity("todo");
const todoArray = new schema.Array(todo);

const fetchTodo = ({ type }) => (dispatch, getState, context) => {
  return context.api.fetchTodo({ type }).then(data => {
    console.log("data: ", data);
    return normalize(data, todoArray);
  });
};

const createTodo = ({ type, data, id = Math.random() }) => (
  dispatch,
  getState,
  context
) => {
  return context.api
    .createTodo({ type, data, id })
    .then(el => ({ data: el, tempId: id }));
};

const removeTodo = ({ type, id }) => (dispatch, getState, context) => {
  return context.api.removeTodo({ type, id });
};
const editTodo = ({ type }) => (dispatch, getState, context) => {
  return context.api.editTodo({ type });
};

const toggleTodo = todo => (dispatch, getState, context) => {
  console.log("todo: ", todo);
  const newState = { ...todo, done: !todo.done };
  return context.api.editTodo({ id: todo.id, data: newState });
};

const actions = {
  fetchTodo,
  createTodo,
  removeTodo,
  toggleTodo,
  editTodo
};

export default createActions(actions, {
  prefix: "@todo/",
  meta: ({ type }) => ({ reducerKey: type })
});
