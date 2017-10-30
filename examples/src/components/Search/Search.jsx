import React from "react";
import { Input, Tabs, Spin } from "antd";

const Search = Input.Search;

function LiveSearch(props) {
  const { spinning, ...restProps } = props;
  return (
    <div>
      <Input
        placeholder="input search"
        size="large"
        style={{ width: "70%" }}
        {...restProps}
      />
      <Spin spinning={!!props.spinning} />
    </div>
  );
}

export default LiveSearch;
