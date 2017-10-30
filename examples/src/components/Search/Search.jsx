import React from "react";
import { Input, Spin } from "antd";

function LiveSearch(props) {
  const { spinning, ...restProps } = props;
  return (
    <div>
      <Input
        placeholder="Create Todo"
        size="large"
        style={{ width: "70%" }}
        {...restProps}
      />
      <Spin spinning={!!props.spinning} />
    </div>
  );
}

export default LiveSearch;
