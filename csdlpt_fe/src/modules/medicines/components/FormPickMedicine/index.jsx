import SelectBuilder from "@components/SelectBuilder";
import useGetMedicine from "@modules/medicines/hooks/query/useGetMedicine";
import { Button, Form, Input, InputNumber, Select, Table } from "antd";
import React from "react";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
const FormPickMedicine = ({ name }) => {
  const { data: medicine } = useGetMedicine();
  return (
    <Form.List
      // initialValue={
      //   initialData?.templateVariable &&
      //   Object?.keys(JSON.parse(initialData?.templateVariable)).map(
      //     (v) => {
      //       return {
      //         name: v,
      //         value: JSON.parse(initialData?.templateVariable)?.[v],
      //       };
      //     }
      //   )
      // }
      name={[name || "data"]}
    >
      {(fields, { add, remove }) => (
        <div>
          <Table
            pagination={false}
            dataSource={[...fields]}
            columns={[
              {
                dataIndex: "name",
                title: "Thuốc",
                key: "name",
                render: (value, { key, name, nameValue, ...restField }) => (
                  <Form.Item
                    {...restField}
                    name={[name, "medicineId"]}
                    className="!mb-0"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn thuốc",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: 200 }}
                      options={medicine?.map((v) => ({
                        label: ` ${v.name}`,
                        value: v._id,
                      }))}
                    ></Select>
                  </Form.Item>
                ),
              },
              {
                title: "Số lượng",
                key: "quantity",
                render: (value, { key, name, nameValue, ...restField }) => (
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    className="!mb-0"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng",
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                ),
              },
              {
                title: "Ghi chú",
                key: "note",
                render: (value, { key, name, nameValue, ...restField }) => (
                  <Form.Item
                    {...restField}
                    name={[name, "note"]}
                    className="!mb-0"
                  >
                    <Input.TextArea />
                  </Form.Item>
                ),
              },
              {
                title: "",
                key: "action",
                render: (value, { key, name, ...restField }) => (
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    htmlType="button"
                    onClick={() => remove(name)}
                  ></Button>
                ),
              },
            ]}
            rowKey={(row) => row?.key}
          />
          <div className="flex items-center justify-between mt-3">
            <Button
              variant="primary"
              icon={<PlusCircleOutlined />}
              htmlType="button"
              onClick={() => add()}
            >
              {"Thêm"}
            </Button>
          </div>
        </div>
      )}
    </Form.List>
  );
};

export default FormPickMedicine;
