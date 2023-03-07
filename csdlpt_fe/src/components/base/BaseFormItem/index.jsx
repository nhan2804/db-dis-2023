import { Form, Input } from "antd";
import React from "react";

const BaseFormItem = () => {
  const BASE_FIELD = [
    { name: "description" },
    { name: "name" },
    { name: "title" },
  ];
  return (
    <>
      {BASE_FIELD.map((e) => (
        <Form.Item key={e?.name} label={e?.label || e?.name} name={e?.name}>
          <Input size="small" />
        </Form.Item>
      ))}
    </>
  );
};

export default BaseFormItem;
