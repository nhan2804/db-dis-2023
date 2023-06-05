import CustomDrawer from "@components/CustomDrawer";
import { Button, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditTicket from "../components/FormCreate";
import useCreateTicket from "../hooks/mutate/useCreateTicket";
import useDeleteTicket from "../hooks/mutate/useDeleteTicket";
import useUpdateTicket from "../hooks/mutate/useUpdateTicket";
import useGetTicket from "../hooks/query/useGetTicket";
import ModalSectionAntd from "@components/ModalSectionAntd";
import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { displayDate } from "@helper/index";
import TicketDetail from "../components/TicketDetail";
import { PageHeader } from "@ant-design/pro-components";
const TicketHome = () => {
  const refDrawerForm = useRef();
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
              title={"Cập nhật phiếu khám"}
              button={({ open }) => (
                <Button icon={<FormOutlined />} onClick={open}>
                  Sửa
                </Button>
              )}
            >
              {({ close }) => (
                <FormEditTicket
                  _id={record?._id}
                  source={record}
                  handleActions={(_, v) => handleModify(_, v, close)}
                />
              )}
            </ModalSectionAntd>
            <Popconfirm
              title="Xác nhận xoá?"
              onConfirm={() => handleModify("DELETE", record)}
            >
              <Button danger icon={<DeleteOutlined />}>
                Xoá
              </Button>
            </Popconfirm>
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

  const { mutate: create, isLoading: isLoadingCreate } = useCreateTicket();
  const { mutate: update, isLoading: isl } = useUpdateTicket();
  const { mutate: deleteP, isLoading: isld } = useDeleteTicket();
  const { data: tickets, isLoading: isGetLoading } = useGetTicket();
  const handleCreate = (_, v, close) => {
    create(v, {
      onSuccess: close,
    });
  };
  const handleModify = (action, data, close) => {
    if (action === "UPDATE") {
      update({ _id: data?._id, formData: data });
    } else if (action === "DELETE") {
      deleteP({ _id: data?._id });
    }

    close?.();
  };

  return (
    <>
      <PageHeader
        title="Danh sách phiếu khám"
        extra={
          <ModalSectionAntd
            ref={refDrawerForm}
            title={"Tạo phiếu khám"}
            size={"2xl"}
            button={({ open }) => (
              <Button type="primary" onClick={open}>
                Tạo mới
              </Button>
            )}
          >
            {({ close }) => (
              <FormEditTicket
                isCreate
                handleActions={(_, v) => handleCreate(_, v, close)}
              />
            )}
          </ModalSectionAntd>
        }
      />

      <Table
        size="large"
        loading={isGetLoading}
        dataSource={tickets}
        columns={columns}
      />
    </>
  );
};

export default TicketHome;
