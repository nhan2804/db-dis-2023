import { FormOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-components";
import ModalSectionAntd from "@components/ModalSectionAntd";
import { displayDate } from "@helper/index";
import { useAppSelector } from "@hooks/reduxHook";
import useGetPatientTicket from "@modules/patients/hooks/query/useGetPatientTicket";
import { Button, Table } from "antd";
import React, { useRef, useState } from "react";
import TicketDetail from "../components/TicketDetail";
const MyTicket = () => {
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const patientId = useAppSelector((state) => state?.auth?.user?.patientId);
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
              title={"Chi tiết phiếu khám"}
              button={({ open }) => (
                <Button icon={<FormOutlined />} onClick={open}>
                  Chi tiết
                </Button>
              )}
            >
              {({ close }) => <TicketDetail data={record} />}
            </ModalSectionAntd>
          </div>
        );
      },
    },
  ];

  const { data: tickets, isLoading: isGetLoading } =
    useGetPatientTicket(patientId);

  return (
    <>
      <PageHeader title="Danh sách phiếu khám" />

      <Table
        size="large"
        loading={isGetLoading}
        dataSource={tickets}
        columns={columns}
      />
    </>
  );
};

export default MyTicket;
