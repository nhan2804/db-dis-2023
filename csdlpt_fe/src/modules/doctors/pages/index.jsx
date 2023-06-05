import CustomDrawer from "@components/CustomDrawer";
import { Button, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditDoctor from "../components/FormCreate";
import useCreateDoctor from "../hooks/mutate/useCreateDoctor";
import useDeleteDoctor from "../hooks/mutate/useDeleteDoctor";
import useUpdateDoctor from "../hooks/mutate/useUpdateDoctor";
import useGetDoctor from "../hooks/query/useGetDoctor";
import ModalSectionAntd from "@components/ModalSectionAntd";
import { displayDate } from "@helper/index";
import { PencilIcon } from "@heroicons/react/20/solid";
import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-components";
import useUserType from "@modules/auth/hooks/useUserType";
const DoctorHome = () => {
  const type = useUserType();
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const columns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Khoa",
      dataIndex: ["department", "name"],
      key: "department",
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
      title: "Chức vụ",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div className="space-x-2">
            {type === "ADMIN" && (
              <>
                <ModalSectionAntd
                  ref={refDrawerForm}
                  title={"Cập nhật bác sĩ"}
                  button={({ open }) => (
                    <Button icon={<FormOutlined />} onClick={open}>
                      Sửa
                    </Button>
                  )}
                >
                  {({ close }) => (
                    <FormEditDoctor
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
              </>
            )}
          </div>
        );
      },
    },
  ];

  const { mutate: create, isLoading: isLoadingCreate } = useCreateDoctor();
  const { mutate: update, isLoading: isl } = useUpdateDoctor();
  const { mutate: deleteP, isLoading: isld } = useDeleteDoctor();
  const { data: doctors, isLoading: ísGetDoctorLoading } = useGetDoctor();
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
        title="Danh sách bác sĩ"
        extra={
          <ModalSectionAntd
            ref={refDrawerForm}
            title={"Tạo bác sĩ"}
            button={({ open }) => (
              <>
                {type === "ADMIN" && (
                  <Button type="primary" onClick={open}>
                    Tạo mới
                  </Button>
                )}
              </>
            )}
          >
            {({ close }) => (
              <FormEditDoctor
                isCreate
                handleActions={(_, v) => handleCreate(_, v, close)}
              />
            )}
          </ModalSectionAntd>
        }
      />

      <Table
        loading={ísGetDoctorLoading}
        size="large"
        dataSource={doctors}
        columns={columns}
      />
    </>
  );
};

export default DoctorHome;
