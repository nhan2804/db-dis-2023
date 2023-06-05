import { PageHeader } from "@ant-design/pro-components";
// import Button from "@components/Button";
import ModalSectionAntd from "@components/ModalSectionAntd";
import { displayDate } from "@helper/index";
import { useAppSelector } from "@hooks/reduxHook";
import useGetPatientPrescription from "@modules/patients/hooks/query/useGetPatientPrescription";
import { Button, Table } from "antd";
import React, { useRef, useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import PrescriptionDetail from "../components/PrescriptionDetail";

const MyPrescription = () => {
  const refDrawerForm = useRef();
  const patientId = useAppSelector((state) => state?.auth?.user?.patientId);

  const [selected, setSelected] = useState();
  const columns = [
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
              title={"Chi tiết đơn thuốc"}
              button={({ open }) => (
                <Button icon={<FormOutlined />} onClick={open}>
                  Chi tiết
                </Button>
              )}
            >
              {({ close }) => <PrescriptionDetail data={record} />}
            </ModalSectionAntd>
          </div>
        );
      },
    },
  ];

  const { data: prescription } = useGetPatientPrescription(patientId);

  return (
    <>
      <PageHeader title="Danh sách đơn thuốc" />

      <Table size="large" dataSource={prescription} columns={columns} />
    </>
  );
};

export default MyPrescription;
