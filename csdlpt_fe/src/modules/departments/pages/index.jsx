import CustomDrawer from "@components/CustomDrawer";
import { Button, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditDepartment from "../components/FormCreate";
import useCreateDepartment from "../hooks/mutate/useCreateDepartment";
import useDeleteDepartment from "../hooks/mutate/useDeleteDepartment";
import useUpdateDepartment from "../hooks/mutate/useUpdateDepartment";
import useGetDepartment from "../hooks/query/useGetDepartment";
import ModalSectionAntd from "@components/ModalSectionAntd";
import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-components";
import { Content } from "antd/es/layout/layout";
const DepartmentHome = () => {
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "age",
    },
    {
      title: "Leader",
      dataIndex: "leader",
      key: "leader",
    },
    {
      title: "Email Phòng",
      dataIndex: "email",
      key: "email",
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
              title={"Cập nhật khoa"}
              button={({ open }) => (
                <Button icon={<FormOutlined />} onClick={open}>
                  Sửa
                </Button>
              )}
            >
              {({ close }) => (
                <FormEditDepartment
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

  const { mutate: create, isLoading: isLoadingCreate } = useCreateDepartment();
  const { mutate: update, isLoading: isl } = useUpdateDepartment();
  const { mutate: deleteP, isLoading: isld } = useDeleteDepartment();
  const { data: departments, isLoading: isGetLoading } = useGetDepartment();
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
        title="Danh sách khoa"
        extra={
          <ModalSectionAntd
            ref={refDrawerForm}
            title={"Tạo khoa"}
            button={({ open }) => (
              <Button type="primary" onClick={open}>
                Tạo mới
              </Button>
            )}
          >
            {({ close }) => (
              <FormEditDepartment
                isCreate
                handleActions={(_, v) => handleCreate(_, v, close)}
              />
            )}
          </ModalSectionAntd>
        }
      />

      <Content>
        <Table
          size="large"
          loading={isGetLoading}
          dataSource={departments}
          columns={columns}
        />
      </Content>
    </>
  );
};

export default DepartmentHome;
