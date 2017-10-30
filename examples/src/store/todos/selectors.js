import { get } from "lodash-es";
const resolveTodo = ({ id }) => state => get(state, `todos.todoData[${id}]`);

const resolveTodos = ({ type }) => state => {
  const data = get(state, `todos.todoData`);
  const ids = get(state, `todos[${type}]`, []);
  console.log("ids: ", ids);
  return ids.map(el => data[el]);
};

export default { resolveTodo, resolveTodos };
