import CustomDrawer from "@components/CustomDrawer";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import FormEditPrescription from "../components/FormCreate";
import useCreatePrescription from "../hooks/mutate/useCreatePrescription";
import useDeletePrescription from "../hooks/mutate/useDeletePrescription";
import useUpdatePrescription from "../hooks/mutate/useUpdatePrescription";
import useGetPrescription from "../hooks/query/useGetPrescription";

const PrescriptionHome = () => {
  const refDrawerForm = useRef();
  const [selected, setSelected] = useState();
  const columns = [
    {
      title: "Mã phòng",
      dataIndex: "code",
      key: "v",
      render: (text, record) => (
        // <Button onClick={() => setSelected(record)}>{text}</Button>
        <CustomDrawer
          ref={refDrawerForm}
          title={"CURD " + record?.name}
          button={({ open }) => <Button onClick={open}>{text}</Button>}
        >
          {({ close }) => (
            <FormEditPrescription
              _id={record?._id}
              source={record}
              handleActions={(_, v) => handleModify(_, v, close)}
            />
          )}
        </CustomDrawer>
      ),
    },
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
  ];

  const { mutate: create, isLoading: isLoadingCreate } =
    useCreatePrescription();
  const { mutate: update, isLoading: isl } = useUpdatePrescription();
  const { mutate: deleteP, isLoading: isld } = useDeletePrescription();
  const { data: prescriptions } = useGetPrescription();
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
    <div>
      <CustomDrawer
        ref={refDrawerForm}
        title={"CURD Phòng ban"}
        button={({ open }) => (
          <Button type="primary" onClick={open}>
            Tạo mới
          </Button>
        )}
      >
        {({ close }) => (
          <FormEditPrescription
            isCreate
            handleActions={(_, v) => handleCreate(_, v, close)}
          />
        )}
      </CustomDrawer>
      <div>
        <div className="text-2xl ">Danh sách phòng ban</div>
        <Table
          size="large"
          dataSource={prescriptions?.payload}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default PrescriptionHome;
