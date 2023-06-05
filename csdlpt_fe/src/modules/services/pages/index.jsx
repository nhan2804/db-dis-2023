import CustomDrawer from "@components/CustomDrawer";
import { Button, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditService from "../components/FormCreate";
import useCreateService from "../hooks/mutate/useCreateService";
import useDeleteService from "../hooks/mutate/useDeleteService";
import useUpdateService from "../hooks/mutate/useUpdateService";
import useGetService from "../hooks/query/useGetService";
import ModalSectionAntd from "@components/ModalSectionAntd";
import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-components";
import useUserType from "@modules/auth/hooks/useUserType";
const ServiceHome = () => {
  const type = useUserType();
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
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
                  title={"Cập nhật dịch vụ"}
                  button={({ open }) => (
                    <Button icon={<FormOutlined />} onClick={open}>
                      Sửa
                    </Button>
                  )}
                >
                  {({ close }) => (
                    <FormEditService
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

  const { mutate: create, isLoading: isLoadingCreate } = useCreateService();
  const { mutate: update, isLoading: isl } = useUpdateService();
  const { mutate: deleteP, isLoading: isld } = useDeleteService();
  const { data: services, isLoading: isGetLoading } = useGetService();
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
        title="Danh sách dịch vụ"
        extra={
          type === "ADMIN" && (
            <ModalSectionAntd
              ref={refDrawerForm}
              title={"Tạo dịch vụ"}
              button={({ open }) => (
                <Button type="primary" onClick={open}>
                  Tạo mới
                </Button>
              )}
            >
              {({ close }) => (
                <FormEditService
                  isCreate
                  handleActions={(_, v) => handleCreate(_, v, close)}
                />
              )}
            </ModalSectionAntd>
          )
        }
      />

      <Table
        loading={isGetLoading}
        size="large"
        dataSource={services}
        columns={columns}
      />
    </>
  );
};

export default ServiceHome;
