import { displayDate } from "@helper/index";
import { Descriptions, Divider, Table } from "antd";
import Title from "antd/es/typography/Title";
import { get } from "lodash-es";
import React from "react";

const TicketDetail = ({ data }) => {
  const labelToDisplay = [
    { displayKey: "Tên bệnh nhân", valueKey: "patient.fullName" },
    {
      displayKey: "Tên bác sĩ",
      valueKey: "doctor.fullName",
    },
    { displayKey: "Ngày khám", valueKey: "dateVisit", span: 2 },
    { displayKey: "Mạch", valueKey: "greettingInfo.mach" },
    { displayKey: "Nhiệt độ", valueKey: "greettingInfo.temperature" },
    { displayKey: "Huyết áp", valueKey: "greettingInfo.bloodPressure" },
    { displayKey: "Cân nặng", valueKey: "greettingInfo.weight" },
    { displayKey: "Lâm sàn", valueKey: "clinical" },
    { displayKey: "Bệnh chính", valueKey: "mainDisease" },
    { displayKey: "Bệnh phụ", valueKey: "secondaryDisease" },
    { displayKey: "Ngày hẹn khám lại", valueKey: "dateReVisit" },
    { displayKey: "Lời dặn", valueKey: "note" },
  ];

  const medicineColumns = [
    {
      title: "Tên thuốc",
      dataIndex: ["medicine", "name"],
      key: "medicine.name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];
  const serviceColumns = [
    {
      title: "Tên dịch vụ",
      dataIndex: ["service", "name"],

      key: "medicine.name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];
  return (
    <div>
      <Descriptions bordered column={2}>
        {labelToDisplay.map((key) => {
          const label = key?.displayKey;
          const value = get(data, key?.valueKey);
          return (
            <Descriptions.Item label={label} span={key?.span || 1}>
              {key?.valueKey?.includes("date") || key?.valueKey?.includes("dob")
                ? displayDate(value, "DD-MM-YYYY")
                : value}
            </Descriptions.Item>
          );
        })}
      </Descriptions>

      <Divider></Divider>

      <div>
        <Title level={5}>Thuốc</Title>
        <Table
          size="large"
          dataSource={data?.prescription?.medicineItems}
          columns={medicineColumns}
        />
      </div>
      <div>
        <Title level={5}>Dịch vụ</Title>
        <Table
          size="large"
          dataSource={data?.serviceItems}
          columns={serviceColumns}
        />
      </div>
    </div>
  );
};

export default TicketDetail;
