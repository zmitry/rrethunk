import {
  applyMiddleware,
  compose,
  createStore as createReduxStore
} from "redux";
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";
import { setupApi } from "../services";

const extraArgs = { token: "qwer", origin: "https://vk.com" };

const createStore = (initialState = {}) => {
  const middleware = [
    thunk.withExtraArgument({
      api: setupApi(extraArgs)
    })
  ];
  const enhancers = [];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function") {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );
  store.asyncReducers = {};
  return store;
};

export default createStore;
