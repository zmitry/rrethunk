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

  render() {
    const { items, loading, actions } = this.props;

    return (
      <div
        style={{ display: "flex", justifyContent: "center", minHeight: 200 }}
      >
        <Spin spinning={!!loading}>
          <ul>
            {items.map(el => {
              console.log("el: ", el);
              const style = el.done ? { textDecoration: "line-through" } : {};
              return (
                <li
                  onClick={e => actions.toggleTodo(el)}
                  key={el.id}
                  style={style}
                >
                  <Spin spinning={!!el.loading && el.loading !== "undefined"}>
                    {el.text}
                  </Spin>
                </li>
              );
            })}
          </ul>
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
