import CustomDrawer from "@components/CustomDrawer";
import { Button, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditMedicalRecord from "../components/FormCreate";
import useCreateMedicalRecord from "../hooks/mutate/useCreateMedicalRecord";
import useDeleteMedicalRecord from "../hooks/mutate/useDeleteMedicalRecord";
import useUpdateMedicalRecord from "../hooks/mutate/useUpdateMedicalRecord";
import useGetMedicalRecord from "../hooks/query/useGetMedicalRecord";
import ModalSectionAntd from "@components/ModalSectionAntd";
import { displayDate } from "@helper/index";
import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import MedicalRecordDetail from "../components/MedicalRecordDetail";
import { PageHeader } from "@ant-design/pro-components";
import { useParams } from "react-router";
import useGetPatientMedicalRecord from "@modules/patients/hooks/query/useGetPatientMedicalRecord";
import { useAppSelector } from "@hooks/reduxHook";
const MyMedicalRecord = () => {
  const refDrawerForm = useRef();
  const patientId = useAppSelector((state) => state?.auth?.user?.patientId);

  const [selected, setSelected] = useState();
  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: ["patient", "fullName"],
      key: "v",
    },
    {
      title: "Ngày sinh bệnh nhân",
      dataIndex: ["patient", "dob"],
      key: "v",
      render: (date) => displayDate(date, "DD-MM-YYYY"),
    },
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
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="space-x-2">
            <ModalSectionAntd
              size={"2xl"}
              ref={refDrawerForm}
              title={"Chi tiết bệnh án"}
              button={({ open }) => (
                <Button icon={<FormOutlined />} onClick={open}>
                  Chi tiết
                </Button>
              )}
            >
              {({ close }) => <MedicalRecordDetail data={record} />}
            </ModalSectionAntd>
          </div>
        );
      },
    },
  ];

  const { data: medicalRecords } = useGetPatientMedicalRecord(patientId);

  return (
    <>
      <PageHeader title="Danh sách bệnh án" />

      <Table size="large" dataSource={medicalRecords} columns={columns} />
    </>
  );
};

export default MyMedicalRecord;
