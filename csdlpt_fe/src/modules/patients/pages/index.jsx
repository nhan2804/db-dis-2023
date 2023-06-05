import CustomDrawer from "@components/CustomDrawer";
import { Button, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditPatient from "../components/FormCreate";
import useCreatePatient from "../hooks/mutate/useCreatePatient";
import useDeletePatient from "../hooks/mutate/useDeletePatient";
import useUpdatePatient from "../hooks/mutate/useUpdatePatient";
import useGetPatients from "../hooks/query/useGetPatients";
import ModalSectionAntd from "@components/ModalSectionAntd";
import { displayDate } from "@helper/index";
import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PageHeader } from "@ant-design/pro-components";
const PatientHome = () => {
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const columns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <Link to={`/patients/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      render: (text) => displayDate(text, "DD-MM-YYYY"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="space-x-2">
            <ModalSectionAntd
              ref={refDrawerForm}
              title={record?.name}
              button={({ open }) => (
                <Button icon={<FormOutlined />} onClick={open}>
                  Sửa
                </Button>
              )}
            >
              {({ close }) => (
                <FormEditPatient
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
          </div>
        );
      },
    },
  ];

  const { mutate: create, isLoading: isLoadingCreate } = useCreatePatient();
  const { mutate: update, isLoading: isl } = useUpdatePatient();
  const { mutate: deleteP, isLoading: isld } = useDeletePatient();
  const { data: patients } = useGetPatients();
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
        title="Danh sách bệnh nhân"
        extra={
          <ModalSectionAntd
            ref={refDrawerForm}
            title={"Tạo bệnh nhân"}
            button={({ open }) => (
              <Button type="primary" onClick={open}>
                Tạo mới
              </Button>
            )}
          >
            {({ close }) => (
              <FormEditPatient
                isCreate
                handleActions={(_, v) => handleCreate(_, v, close)}
              />
            )}
          </ModalSectionAntd>
        }
      />

      <Table size="large" dataSource={patients} columns={columns} />
    </>
  );
};

export default PatientHome;
