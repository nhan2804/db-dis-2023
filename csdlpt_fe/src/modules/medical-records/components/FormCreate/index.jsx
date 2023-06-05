import SelectBuilder from "@components/SelectBuilder";
import BaseFormItem from "@components/base/BaseFormItem";
import useGetDepartment from "@modules/departments/hooks/query/useGetDepartment";
import useGetDoctor from "@modules/doctors/hooks/query/useGetDoctor";
import FormPickMedicine from "@modules/medicines/components/FormPickMedicine";
import useGetMedicine from "@modules/medicines/hooks/query/useGetMedicine";
import useGetPatients from "@modules/patients/hooks/query/useGetPatients";
import FormPickService from "@modules/services/components/FormPickService";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  Popconfirm,
  Space,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const FormEditMedicalRecord = ({
  _id,
  children,
  source,
  handleActions,
  loading,
  isCreate,
  ...rest
}) => {
  const { data: departments } = useGetDepartment();
  const { data: doctors } = useGetDoctor();
  const { data: patients } = useGetPatients();
  const { data: medicines } = useGetMedicine();
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
      initialValues={{
        ...source,
        dateMoveIn: source?.dateMoveIn && moment(source?.dateMoveIn),
        medicineItems: source?.prescription?.medicineItems,
      }}
      autoComplete="off"
      // size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {/* <BaseFormItem /> */}
      <Form.Item label={"Bác sĩ"} name={"doctorId"}>
        <SelectBuilder data={doctors} labelKey="fullName" valueKey="_id" />
      </Form.Item>
      <Form.Item label={"Bệnh nhân"} name={"patientId"}>
        <SelectBuilder data={patients} labelKey="fullName" valueKey="_id" />
      </Form.Item>
      <Form.Item label={"Ngày nhập viện"} name={"dateMoveIn"}>
        <DatePicker />
      </Form.Item>
      <Form.Item label={"Lý do nhập viện"} name={"reason"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label={"Chuẩn đoán sơ bộ lâm sàn"}
        name={"preliminaryClinicalDiagnosis"}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"Bệnh sử"} name={"medicalHistory"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"Tiền sử"} name={"antecedent"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"Khám bệnh"} name={"examination"}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item label={"Chuẩn đoán"} name={"diagnosis"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"Điều trị"} name={"treatment"}>
        <Input.TextArea />
      </Form.Item>
      <div className="mb-5 space-y-1">
        <div>Thuốc</div>
        <FormPickMedicine name={"medicineItems"} />
      </div>
      <div className="mb-5 space-y-1">
        <div>Dịch vụ</div>
        <FormPickService name={"serviceItems"} />
      </div>
      <Form.Item label={"Tóm tắt bệnh án"} name={"summary"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"Tiên lượng"} name={"prognosis"}>
        <Input.TextArea />
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

export default FormEditMedicalRecord;
