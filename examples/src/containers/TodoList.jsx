import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import { withActionsConnect } from "rrethunk";
import { actions, selectors } from "../store/todos";

class TodoList extends Component {
  componentDidMount() {
    const { actions, type } = this.props;
    actions.fetchTodo({ type });
  }
  renderTodo = el => {
    const style = el.done ? { textDecoration: "line-through" } : {};
    return (
      <li
        key={el.id}
        style={style}
        onClick={e => {
          this.props.actions.toggleTodo(el);
          console.log("el: ", actions.toggleTodo);
          console.log("click");
        }}
      >
        <Spin spinning={!!el.loading && el.loading !== "undefined"}>
          {el.text}
        </Spin>
      </li>
    );
  };
  render() {
    const { items, loading, actions } = this.props;

    return (
      <div
        style={{ display: "flex", justifyContent: "center", minHeight: 200 }}
      >
        <Spin spinning={!!loading}>
          <ul>{items.map(this.renderTodo)}</ul>
        </Spin>
      </div>
    );
  }
}

const enhance = connect((state, props) => {
  return {
    items: selectors.resolveTodos({ type: props.type })(state),
    loading: state.actions[actions.fetchTodo._busyType]
  };
}, withActionsConnect(actions));

export default enhance(TodoList);
