import "antd/dist/antd.css";
import "./App.css";

import React, { Component } from "react";
import { Provider } from "react-redux";
import TodoContainer from "./containers/Todo";
import { createStore } from "./store/index";

class App extends Component {
  render() {
    return (
      <Provider store={createStore()}>
        <div className="App">
          <TodoContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
