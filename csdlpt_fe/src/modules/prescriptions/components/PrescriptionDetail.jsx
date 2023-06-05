import { displayDate } from "@helper/index";
import { Descriptions, Divider, Table } from "antd";
import Title from "antd/es/typography/Title";
import { get } from "lodash-es";
import React from "react";

const PrescriptionDetail = ({ data }) => {
  const labelToDisplay = [
    { displayKey: "Tên bệnh nhân", valueKey: "patient.fullName" },
    {
      displayKey: "Tên bác sĩ",
      valueKey: "doctor.fullName",
    },
    { displayKey: "Ngày tạo", valueKey: "createdAt", span: 2 },
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

  return (
    <div>
      <Descriptions bordered column={2}>
        {labelToDisplay.map((key) => {
          const label = key?.displayKey;
          const value = get(data, key?.valueKey);
          return (
            <Descriptions.Item label={label} span={key?.span || 1}>
              {key?.valueKey?.includes("date") ||
              key?.valueKey?.includes("dob") ||
              key?.valueKey?.includes("createdAt")
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
    </div>
  );
};

export default PrescriptionDetail;
