import { PageHeader } from "@ant-design/pro-components";
import { Breadcrumb, Descriptions, Divider, Table } from "antd";
import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import useGetPatient from "../hooks/query/useGetPatient";
import useGetPatientMedicalRecord from "../hooks/query/useGetPatientMedicalRecord";
import useGetPatientPrescription from "../hooks/query/useGetPatientPrescription";
import useGetPatientTicket from "../hooks/query/useGetPatientTicket";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { displayDate } from "@helper/index";
const PatientDetail = () => {
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const { patientId } = useParams();
  const { data: patients } = useGetPatient(patientId);
  const { data: medicalRecords } = useGetPatientMedicalRecord(patientId);
  const { data: tickets } = useGetPatientTicket(patientId);
  const { data: prescriptions } = useGetPatientPrescription(patientId);
  const labelToDisplay = {
    fullName: "Họ và tên",
    dob: "Ngày sinh",
    cccd: "Số CCCD",
    sex: "Giới tính",
    phone: "Số điện thoại",
    address: "Địa chỉ",
  };
  const ticketColumns = [
    {
      title: "Bác sĩ",
      dataIndex: ["doctor", "fullName"],
      key: "doctor",
    },
    {
      title: "Ngày khám",
      dataIndex: "dateMoveIn",
      key: "dateVisit",
      render: (date) => displayDate(date, "DD-MM-YYYY"),
    },
    {
      title: "Ngày hẹn khám lại",
      dataIndex: "dateReVisit",
      key: "dateReVisit",
      render: (date) => displayDate(date, "DD-MM-YYYY"),
    },
  ];
  const prescriptionsColumns = [
    {
      title: "Bác sĩ",
      dataIndex: ["doctor", "fullName"],
      key: "doctor",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => displayDate(date, "DD-MM-YYYY"),
    },
  ];
  const medicalRecordColumns = [
    {
      title: "Bác sĩ",
      dataIndex: ["doctor", "fullName"],
      key: "doctor",
    },
    {
      title: "Ngày nhập viện",
      dataIndex: "dateMoveIn",
      key: "dateMoveIn",
      render: (date) => displayDate(date, "DD-MM-YYYY"),
    },
  ];

  return (
    <div>
      <div>
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/patients"}>Bệnh nhân</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{patients?.fullName}</Breadcrumb.Item>
            </Breadcrumb>
          }
          title="Bệnh nhân"
        />

        <div>
          <Descriptions bordered title="Thông tin bênh nhân">
            {Object.keys(labelToDisplay).map((key) => {
              return (
                <Descriptions.Item label={labelToDisplay[key]}>
                  {key?.includes("date") || key?.includes("dob")
                    ? displayDate(patients?.[key], "DD-MM-YYYY")
                    : patients?.[key]}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </div>
        <Divider></Divider>
        <div>
          <Title level={5}>Danh sách bệnh án</Title>
          <Table
            size="large"
            dataSource={medicalRecords}
            columns={medicalRecordColumns}
          />
        </div>
        <Divider></Divider>
        <div>
          <Title level={5}>Danh sách phiếu khám</Title>
          <Table size="large" dataSource={tickets} columns={ticketColumns} />
        </div>
        <Divider></Divider>

        <div>
          <Title level={5}>Danh sách đơn thuốc</Title>
          <Table
            size="large"
            dataSource={prescriptions}
            columns={prescriptionsColumns}
          />
        </div>

        {/* <Table size="large" dataSource={patients} columns={columns} /> */}
      </div>
    </div>
  );
};

export default PatientDetail;
