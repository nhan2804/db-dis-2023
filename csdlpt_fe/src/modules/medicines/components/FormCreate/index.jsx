import BaseFormItem from "@components/base/BaseFormItem";
import { Button, Empty, Form, Input, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const FormEditMedicine = ({
  _id,
  children,
  source,
  handleActions,
  loading,
  isCreate,
  ...rest
}) => {
  const [frmInputField] = Form.useForm();
  let nav = useNavigate();
  const [action, setAction] = useState("");
  const onFinish = (values) => {
    handleActions(action, { _id, ...source, ...values });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Form onFinishFailed:", errorInfo);
  };

  //   if (!source) return <Empty />;
  return (
    <Form
      disabled={loading}
      form={frmInputField}
      layout="vertical"
      initialValues={source}
      autoComplete="off"
      // size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* <BaseFormItem /> */}
      <Form.Item label={"Tên"} name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Giá"} name={"price"}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label={"Số lượng"} name={"quantity"}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label={"Đơn vị"} name={"unit"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Danh mục"} name={"category"}>
        <Input />
      </Form.Item>

      <Form.Item className="text-right">
        {/* <Button
          type="primary"
          loading={loading}
          onClick={() => {
            nav(`/projects/${source?._id}`);
          }}
        >
          Huỷ
        </Button> */}
        {isCreate ? (
          <Button type="primary" htmlType="submit">
            Tạo mới
          </Button>
        ) : (
          <Space>
            <Button
              onClick={async () => {
                setAction("UPDATE");

                //   frmInputField.submit();
              }}
              type="default"
              htmlType="submit"
              loading={rest?.loadingUpdate}
            >
              Cập nhật
            </Button>
          </Space>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormEditMedicine;
