import BaseFormItem from "@components/base/BaseFormItem";
import { Button, Empty, Form, Input, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const FormEditDepartment = ({
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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={source}
      autoComplete="off"
      size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* <BaseFormItem /> */}
      <Form.Item label={"Mã phòng"} name={"code"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Tên phòng"} name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Trưởng phòng"} name={"leader"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Email phòng"} name={"email"}>
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        {isCreate ? (
          <Button type="default" htmlType="submit">
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
              Update
            </Button>
            <Popconfirm
              title="Delete notification"
              description="Are you sure to delete this?"
              onConfirm={async () => {
                setAction("DELETE");

                frmInputField.submit();
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button loading={rest?.loadingDetele} type="primary" danger>
                Delete
              </Button>
            </Popconfirm>

            <Button
              type="primary"
              loading={loading}
              onClick={() => {
                nav(`/projects/${source?._id}`);
              }}
            >
              Continue
            </Button>
          </Space>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormEditDepartment;
