import SelectBuilder from "@components/SelectBuilder";
import BaseFormItem from "@components/base/BaseFormItem";
import useGetDepartment from "@modules/departments/hooks/query/useGetDepartment";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const FormEditDoctor = ({
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
  const { data: departments } = useGetDepartment();
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
      initialValues={{
        ...source,
        dob: moment(source?.dob),
      }}
      autoComplete="off"
      // size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* <BaseFormItem /> */}
      <Form.Item label={"Tên"} name={"fullName"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Giới tính"} name={"sex"}>
        <Select>
          <Select.Option value="Nam">Nam</Select.Option>
          <Select.Option value="Nữ">Nữ</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label={"Khoa"} name={"departmentId"}>
        <SelectBuilder data={departments} labelKey="name" valueKey="_id" />
      </Form.Item>

      <Form.Item label={"Ngày sinh"} name={"dob"}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Cần nhập cccd" }]}
        label={"CCCD"}
        name={"cccd"}
      >
        <Input />
      </Form.Item>
      <Form.Item label={"Số điện thoại"} name={"phone"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Địa chỉ"} name={"address"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Vị trí"} name={"position"}>
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

export default FormEditDoctor;
