import CustomDrawer from "@components/CustomDrawer";
import { Button, Popconfirm, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditMedicine from "../components/FormCreate";
import useCreateMedicine from "../hooks/mutate/useCreateMedicine";
import useDeleteMedicine from "../hooks/mutate/useDeleteMedicine";
import useUpdateMedicine from "../hooks/mutate/useUpdateMedicine";
import useGetMedicine from "../hooks/query/useGetMedicine";
import ModalSectionAntd from "@components/ModalSectionAntd";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  FormOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-components";
import useUserType from "@modules/auth/hooks/useUserType";
const MedicineHome = () => {
  const type = useUserType();
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
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
      title: "Số lượng còn lại",
      dataIndex: "quantity",
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
                  title={record?.name}
                  button={({ open }) => (
                    <Button icon={<FormOutlined />} onClick={open}>
                      Sửa
                    </Button>
                  )}
                >
                  {({ close }) => (
                    <FormEditMedicine
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

  const { mutate: create, isLoading: isLoadingCreate } = useCreateMedicine();
  const { mutate: update, isLoading: isl } = useUpdateMedicine();
  const { mutate: deleteP, isLoading: isld } = useDeleteMedicine();
  const { data: medicines } = useGetMedicine();
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
        title="Danh sách thuốc"
        extra={
          type === "ADMIN" && (
            <ModalSectionAntd
              ref={refDrawerForm}
              title={"Tạo thuốc"}
              button={({ open }) => (
                <Button type="primary" onClick={open}>
                  Tạo mới
                </Button>
              )}
            >
              {({ close }) => (
                <FormEditMedicine
                  isCreate
                  handleActions={(_, v) => handleCreate(_, v, close)}
                />
              )}
            </ModalSectionAntd>
          )
        }
      />

      <Table size="large" dataSource={medicines} columns={columns} />
    </>
  );
};

export default MedicineHome;
