import SelectBuilder from "@components/SelectBuilder";
import BaseFormItem from "@components/base/BaseFormItem";
import useGetDoctor from "@modules/doctors/hooks/query/useGetDoctor";
import FormPickMedicine from "@modules/medicines/components/FormPickMedicine";
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

const FormEditTicket = ({
  _id,
  children,
  source,
  handleActions,
  loading,
  isCreate,
  ...rest
}) => {
  const [frmInputField] = Form.useForm();
  const { data: doctors } = useGetDoctor();
  const { data: patients } = useGetPatients();
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
        dateVisit:
          source?.dateVisit && source?.dateVisit && moment(source?.dateVisit),
        dateReVisit:
          source?.dateReVisit &&
          source?.dateReVisit &&
          moment(source?.dateReVisit),
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
      <Form.Item label={"Ngày khám"} name={"dateVisit"}>
        <DatePicker />
      </Form.Item>
      <div className="grid w-full grid-cols-2 gap-x-5">
        <Form.Item label={"Mạch"} name={["greettingInfo", "pulse"]}>
          <Input addonAfter="Lần/phút" />
        </Form.Item>
        <Form.Item label={"Nhiệt độ"} name={["greettingInfo", "temperature"]}>
          <Input type="number" addonAfter="C" />
        </Form.Item>
        <Form.Item label={"Huyết áp"} name={["greettingInfo", "bloodPressure"]}>
          <Input addonAfter="mmHg" />
        </Form.Item>
        <Form.Item label={"Cân nặng"} name={["greettingInfo", "weight"]}>
          <Input type="number" addonAfter="Kg" />
        </Form.Item>
      </div>

      <Form.Item label={"Lâm sàn"} name={"clinical"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"Bệnh chính"} name={"mainDisease"}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label={"Bệnh phụ"} name={"secondaryDisease"}>
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

      <Form.Item label={"Ngày hẹn khám lại"} name={"dateReVisit"}>
        <DatePicker />
      </Form.Item>
      <Form.Item label={"Lời dặn"} name={"note"}>
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

export default FormEditTicket;
