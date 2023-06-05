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
const MedicalRecordHome = () => {
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
              title={"Cập nhật bệnh án"}
              button={({ open }) => (
                <Button icon={<FormOutlined />} onClick={open}>
                  Sửa
                </Button>
              )}
            >
              {({ close }) => (
                <FormEditMedicalRecord
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

  const { mutate: create, isLoading: isLoadingCreate } =
    useCreateMedicalRecord();
  const { mutate: update, isLoading: isl } = useUpdateMedicalRecord();
  const { mutate: deleteP, isLoading: isld } = useDeleteMedicalRecord();
  const { data: medicalRecords } = useGetMedicalRecord();
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
        title="Danh sách bệnh án"
        extra={
          <ModalSectionAntd
            size={"2xl"}
            ref={refDrawerForm}
            title={"Tạo bệnh án"}
            button={({ open }) => (
              <Button type="primary" onClick={open}>
                Tạo mới
              </Button>
            )}
          >
            {({ close }) => (
              <FormEditMedicalRecord
                isCreate
                handleActions={(_, v) => handleCreate(_, v, close)}
              />
            )}
          </ModalSectionAntd>
        }
      />

      <Table size="large" dataSource={medicalRecords} columns={columns} />
    </>
  );
};

export default MedicalRecordHome;
