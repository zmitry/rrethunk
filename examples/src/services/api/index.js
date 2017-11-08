import { toArray } from "lodash-es";

const delay = time =>
  new Promise((r, j) => {
    setTimeout(r, time);
  });

const storage = {
  1: {
    id: 1,
    text: "qwerw"
  },
  2: {
    id: 2,
    text: "werwq"
  },
  3: {
    id: 3,
    text: "werqw rw rw"
  }
};
const T = 2000;
let id = 100;

export const setupApi = ({ token, origin }) => {
  const fetchTodo = ({ type }) => {
    return delay(T).then(el => {
      // simulate backend response
      return toArray(storage).filter(el => {
        if (type === "done") {
          return el.done === true;
        } else if (type === "todo") {
          return el.done !== true;
        } else {
          return true;
        }
      });
    });
  };

  const createTodo = ({ data }) => {
    if (Math.random() > 0.5) {
      return Promise.reject({ error: "bla bla" });
    }
    return delay(T).then(e => {
      storage[++id] = data;
      data["id"] = id;
      return storage[id];
    });
  };
  const removeTodo = ({ id }) => {
    return delay(T).then(e => {
      const store = storage;
      const entity = store[id];
      Reflect.defineProperty(store, id);
      return entity;
    });
  };
  const editTodo = ({ type, id, data }) => {
    return delay(T).then(e => {
      storage[id] = data;
      return storage[id];
    });
  };
  return {
    editTodo,
    removeTodo,
    createTodo,
    fetchTodo
  };
};

export default setupApi;
