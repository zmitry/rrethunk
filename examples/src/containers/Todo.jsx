import React, { Component } from "react";
import { Tabs, Layout, Spin } from "antd";

import LiveSearch from "../components/Search";
import { connect } from "react-redux";
import { withActionsConnect } from "rrethunk";
import { actions } from "../store/todos";
import TodoList from "./TodoList";
const { Header, Content, Footer } = Layout;
const TabPane = Tabs.TabPane;

class TodoContainer extends Component {
  state = {};
  onCreate = e => {
    this.props.actions.createTodo({
      type: "all",
      data: { text: e.target.value },
      id: Math.random()
    });
  };
  onChange = e => {
    this.props.actions.fetchTodo({ type: e });
  };
  render() {
    const props = this.props;
    return (
      <div>
        <Layout>
          <Header>
            <LiveSearch
              spinning={props.creating}
              onPressEnter={this.onCreate}
            />
          </Header>
          <Layout>
            <Content>
              <Tabs type="card" onTabClick={this.onChange}>
                <TabPane tab="All" key="all">
                  <TodoList type="all" />
                </TabPane>
                <TabPane tab="Tab 2" key="done">
                  <TodoList type="done" />
                </TabPane>
                <TabPane tab="Tab 3" key="todo">
                  <TodoList type="todo" />
                </TabPane>
              </Tabs>
            </Content>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
      </div>
    );
  }
}

const ehnace = connect(state => {
  return {
    creating: state.actions[actions.createTodo._busyType]
  };
}, withActionsConnect(actions));

export default ehnace(TodoContainer);
