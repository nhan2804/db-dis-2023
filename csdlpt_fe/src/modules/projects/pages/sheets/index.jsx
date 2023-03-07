import {
  SmileOutlined,
  CaretDownOutlined,
  UserOutlined,
  EditOutlined,
  PlusCircleOutlined,
  EyeInvisibleOutlined,
  CaretRightOutlined,
  ClockCircleFilled,
  FileExcelOutlined,
  PlusSquareFilled,
  MenuUnfoldOutlined,
  PlusOutlined,
  AppstoreFilled,
  BorderOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  EditableCellComp,
  MetaComp,
  TextI18,
} from "@components/base/CommonComp";
import ChangeLogs from "@components/ChangeLogs";
import { DataProviderCompA } from "@components/DataProviderComp_A";
import FormEditCol from "@modules/projects/components/Sheets/FormEditCol";
import FormEditSheet from "@modules/projects/components/Sheets/FormEditSheet";
import FormEditType from "@modules/projects/components/Sheets/FormEditType";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Input,
  InputNumber,
  Layout,
  Row,
  Space,
  Table,
  theme,
  message,
  Drawer,
  Typography,
  Tooltip,
  Badge,
} from "antd";
import React, { useEffect, useState } from "react";
// import { dataBaseAPI, DataClient } from "../../../../clients/DataClient";
// import { sheetBaseAPI, SheetClient } from "../../../../clients/SheetClient";

export const FIELD_TYPE = {
  SINGLE_TEXT: {
    mode: "SINGLE_TEXT",
    default: "",
    min: -1,
    max: -1,
    require: false,
  },
  LONG_TEXT: {
    mode: "LONG_TEXT",
    default: "",
    min: -1,
    max: -1,
    require: false,
  },
  BOOLEAN: {
    mode: "BOOLEAN",
    default: true,
    labels: { true: "TRUE", false: "FALSE" },
    require: false,
  },
  DATE: {
    mode: "DATE",
    default: null,
    min: -1,
    max: -1,
    format: "TIME", // DATE, DATETIME, TIME,
    require: false,
  },
  NUMBER: {
    mode: "NUMBER",
    default: 0,
    min: -1,
    max: -1,
    negative: true,
    require: false,
  },
  IMAGE: {
    mode: "IMAGE",
    gallery: false,
    cameraOnly: false,
    require: false,
  },
  GPS: { mode: "GPS", fromMap: true, require: false },
  QR: { mode: "QR", default: "", onlyCamera: false, require: false },
  RECORDER: { mode: "RECORDER", onlyMic: false, require: false },
  ATTACHMENT: { mode: "ATTACHMENT", require: false },
  RATE: { mode: "RATE", default: 0, display: "START", require: false },
  EMAIL: { mode: "EMAIL", default: "", require: false },
  PHONE: { mode: "PHONE", default: "", require: false },
  LINK: { mode: "LINK", default: "", require: false },
  LIST: {
    mode: "LIST",
    source: [],
    multi: true,
    require: false,
  },

  RECORD: { mode: "RECORD", sheetName: null, multi: true, require: false },
  SCRIPT: {
    mode: "SCRIPT",
    code: "",
    display: "TEXT", //TEXT, BUTON, LINK, ICON
    lable: "",
  },
};

const { Content } = Layout;
const { Text } = Typography;
const { useToken } = theme;

const SheetPage = () => {
  const { token } = useToken();

  const [changeLogs, setChangeLogs] = useState({});

  const [fields, setFields] = useState([
    // { name: "_id", label: "ID", type: FIELD_TYPE.SINGLE_TEXT },
    // { name: "name", label: "NAME", type: FIELD_TYPE.SINGLE_TEXT },
    // { name: "sex", label: "SEX", type: FIELD_TYPE.BOOLEAN },
    // { name: "age", label: "AGE", type: FIELD_TYPE.NUMBER },
    // { name: "dob", label: "DOB", type: FIELD_TYPE.DATE },
    // { name: "desc", label: "DESCRIPTION", type: FIELD_TYPE.LONG_TEXT },
    // {
    //   name: "skill",
    //   label: "SKILL",
    //   type: {
    //     ...FIELD_TYPE.LIST,
    //     source: ["JAVA", "PYTHON", "BODY", "SLIM", "FOOT"],
    //   },
    // },
    // { name: "profile_link", label: "PROFILE", type: FIELD_TYPE.LINK },
    // { name: "email", label: "EMAIL", type: FIELD_TYPE.EMAIL },
    // { name: "phone", label: "PHONE", type: FIELD_TYPE.PHONE },
  ]);
  const [source, setSource] = useState([
    // {
    //   _id: "999",
    //   name: "Cường",
    //   sex: true,
    //   age: 35,
    //   desc: "Atlassian vừa phát hành bản vá khắc phục lỗ hổng nghiêm trọng ảnh hưởng đến Jira Service Management Server and Data Center. Lỗ hổng có mã định danh CVE-2023-22501 (điểm CVSS là 9,4), tồn tại do xác thực không đúng cách. Bằng cách gửi một yêu cầu tự tạo, kẻ tấn công có thể khai thác lỗ hổng để mạo danh người dùng khác, đồng thời chiếm quyền truy cập vào đối tượng Quản lý dịch vụ Jira.",
    // },
    // {
    //   _id: "123123",
    //   name: "Cường",
    //   sex: true,
    //   age: 35,
    //   skill: ["JAVA"],
    // },
    // { _id: "qw", name: "Cường", sex: true, age: 35 },
    // { _id: "4", name: "Cường", sex: true, age: 35 },
    // { _id: "qdf", name: "Cường", sex: true, age: 35 },
    // { _id: "45", name: "Cường", sex: true, age: 35 },
    // { _id: "ffd", name: "Cường", sex: true, age: 35 },
    // { _id: "er4", name: "Cường", sex: true, age: 35 },
    // { _id: "*" },
  ]);
  const [ww, setWW] = useState(fields.length * 120);

  // vars region ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const [sheetState, setSheetState] = useState([]);

  /** Data model regions */
  /** Provider state - effectived when data provider add, delete, update... refetch required */
  const [dataState, setDataState] = useState([]);
  const [refetchDataState, setRefetchDataState] = useState(0);
  const [fetchDataState, setFetchDataState] = useState({}); // store process of new, update, delete state
  /**  */
  const [datasState, setDatasState] = useState({}); // Store original fetch datas
  const [finalDatasState, setFinalDatasState] = useState([]); // Final data after Merge original datas with search content
  /**  */
  /** End data model regions */

  // init region ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    // SheetClient(
    //   {
    //     ...sheetBaseAPI.POST_SEARCH,
    //     data: {
    //       filter: { _id: "63e30d7d07c88abcdfa975c7" },
    //       sort: {},
    //       offset: 0,
    //       limit: 1,
    //     },
    //   },
    //   setSheetState,
    //   (respone) => {
    //     setFields([
    //       { name: "_no", type: FIELD_TYPE.SINGLE_TEXT },
    //       ...respone.data?.payload[0].fields,
    //       { name: "_new", type: FIELD_TYPE.SINGLE_TEXT },
    //     ]);
    //   }
    // );
    // DataClient(
    //   {
    //     ...dataBaseAPI.POST_SEARCH,
    //     data: {
    //       filter: {},
    //       sort: {},
    //       offset: 0,
    //       limit: 0,
    //     },
    //   },
    //   setDataState,
    //   (respone) => {
    //     setSource(
    //       respone.data?.payload.map((e, i) => {
    //         return e.values;
    //       })
    //     );
    //   }
    // );
  }, []);

  useEffect(() => {
    // setFields([
    //   { name: "_no", type: FIELD_TYPE.SINGLE_TEXT },
    //   ...fields,
    //   { name: "_new", type: FIELD_TYPE.SINGLE_TEXT },
    // ]);
  }, []);

  useEffect(() => {
    console.log(changeLogs);
  }, [changeLogs]);

  const handleButtonClick = (e) => {
    setRightDrawerState({
      open: true,
      title: "Edit Quản Lý Kho",
      content: <FormEditSheet name={"Quản Lý Kho"} fields={fields} />,
    });
    console.log(e);
    // message.info("Click on left button.");
    // console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
    if (e.key === 4) {
      setRightDrawerState({
        open: true,
        title: "Edit Quản Lý Data Type",
        content: <FormEditType fields={FIELD_TYPE} />,
      });
    }
  };
  const items = [
    {
      label: "Create new",
      key: "1",
      icon: <PlusSquareFilled />,
      danger: true,
    },
    {
      type: "divider",
    },
    {
      label: "Quản lý đại lý",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "Empty data",
      key: "3",
      icon: <UserOutlined />,
    },
    {
      label: "Quản lý data type",
      key: "4",
      icon: "",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const [rightDrawerState, setRightDrawerState] = useState({
    open: false,
    title: "",
    content: <></>,
  });

  return (
    <>
      <Content
        className="content contentA"
        style={{ background: token.colorSplit }}
      >
        <Row>
          <Col span={12} lg={12} xl={10} xxl={10}>
            <Space
              style={{
                fontSize: "0.8em",
                marginBottom: "2px",
                color: token.colorTextSecondary,
              }}
            >
              <span>
                <b>{TextI18({ k: "_filter" })}:</b>
                {" (Expressions)"}
              </span>
              <span>
                <b>{TextI18({ k: "_sort" })}</b>
                {" Name u, Title s"}
              </span>
              <span>
                <b>{TextI18({ k: "_update" })}</b>
                {" 23 12:20:01"}
              </span>
            </Space>
          </Col>
          <Col span={8} sm={12} xs={12} style={{ textAlign: "right" }}>
            <Space
              size={2}
              style={{
                fontSize: "0.6em",
                marginBottom: "2px",
                color: token.colorTextSecondary,
              }}
            >
              <Input
                placeholder={`🔎${TextI18({ k: "_search.content" })}...`}
                style={{
                  fontSize: "0.6em",
                  marginBottom: "2px",
                  color: token.colorTextSecondary,
                }}
              />
            </Space>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <Checkbox>{TextI18({ k: "_regex.search" })}</Checkbox>
                    ),
                    key: "0",
                  },
                  {
                    label: (
                      <Checkbox>{TextI18({ k: "_ignore.unicode" })}</Checkbox>
                    ),
                    key: "1",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <CaretDownOutlined />
            </Dropdown>
          </Col>
        </Row>
        <DataProviderCompA provider={sheetState}>
          <Dropdown
            menu={{
              items: [
                {
                  label: "1st menu item",
                  key: "1",
                },
                {
                  label: "2nd menu item",
                  key: "2",
                },
                {
                  label: "3rd menu item",
                  key: "3",
                },
              ],
            }}
            trigger={["contextMenu"]}
          >
            <div>
              <Table
                className="table-data"
                scroll={{ x: "max-content" }}
                size="small"
                pagination={false}
                showHeader={true}
                bordered="true"
                rowKey="_id"
                // style={{ width: 400, margin: "0 auto" }}
                dataSource={source.map((e, i) => {
                  return { _no: i, ...e };
                })}
                columns={fields.map((e, i) => {
                  // const e = { ...sheetState.data?.payload.fields[k], name: k };
                  return {
                    title:
                      e.name === "_no" ? (
                        <b>No.</b>
                      ) : e.name === "_new" ? (
                        <div key={i} style={{ textAlign: "center" }}>
                          <Button
                            size="small"
                            type="text"
                            // shape="circle"
                            icon={
                              <PlusOutlined
                                style={{
                                  fontSize: "13px",
                                  color: token.colorTextHeading,
                                }}
                              />
                            }
                            onClick={() => {
                              const last = fields.pop();
                              setFields([
                                ...fields,
                                {
                                  name: fields.length,
                                  label: fields.length,
                                  type: FIELD_TYPE.SINGLE_TEXT,
                                },
                                last,
                              ]);
                              setWW(fields.length * 120);
                            }}
                          />
                        </div>
                      ) : (
                        <MetaComp
                          key={i}
                          title={
                            //   <Space wrap size={1}>
                            //     <span>
                            //       {e.label}
                            //       <Button size="small" danger type="text">
                            //         <CloseCircleOutlined
                            //           style={{ fontSize: 9 }}
                            //         />
                            //       </Button>
                            //     </span>
                            //     {/* <Button size="small" danger type="text">
                            //   <StopOutlined style={{ fontSize: 9 }} />
                            // </Button> */}
                            //   </Space>
                            <span className="w-full">
                              {e.label}
                              <Button size="small" danger type="text">
                                <CloseCircleOutlined style={{ fontSize: 9 }} />
                              </Button>
                            </span>
                          }
                          desc={
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <a
                              aria-hidden
                              onClick={() =>
                                setRightDrawerState({
                                  open: true,
                                  title: `Setting ${e.label} column`,
                                  content: (
                                    <FormEditCol
                                      name={e.label}
                                      datatype={e.type.mode}
                                    />
                                  ),
                                })
                              }
                            >
                              {e.type.mode} ⚙
                            </a>
                          }
                        />
                      ),
                    dataIndex: e.name,
                    fixed: e.name === "_id" || e.name === "_no" ? "left" : "",
                    width:
                      e.name === "name"
                        ? 120
                        : e.name === "_new"
                        ? 35
                        : e.name === "_no"
                        ? 30
                        : "",
                    render: (val, row, i) =>
                      e.name === "_no" ? (
                        <div
                          style={{
                            textAlign: "right",
                            paddingRight: 10,
                            color: "lightgray",
                          }}
                        >
                          {val}.
                        </div>
                      ) : (
                        <EditableCellComp
                          editable={true}
                          field={e}
                          val={val}
                          row={row}
                          rowIndex={i}
                          dataIndex={e.name}
                          onValueChange={({
                            cellVal,
                            row,
                            rowIndex,
                            field,
                            dataIndex,
                          }) => {
                            if (cellVal != row[dataIndex]) {
                              if (!changeLogs[row._id]) {
                                changeLogs[row._id] = {
                                  row,
                                  rowIndex,
                                  cells: {},
                                };
                              }
                              changeLogs[row._id].cells[dataIndex] = cellVal;
                            } else if (changeLogs[row["_id"]]) {
                              delete changeLogs[row._id].cells[dataIndex];
                              if (
                                Object.keys(changeLogs[row._id].cells).length <=
                                0
                              )
                                delete changeLogs[row._id];
                            }

                            setChangeLogs({ ...changeLogs });
                          }}
                        />
                      ),
                  };
                })}
                onRow={(record) => {
                  return {
                    onDoubleClick: (e) => {
                      console.log(e.target);
                    },
                  };
                }}
                // onRow={(record, recordIndex) => ({
                //   onClick: (event) => {
                //     setRightDrawerState({
                //       open: true,
                //       title: "Edit Row",
                //       content: <>HELLO</>,
                //     });
                //     console.log(
                //       // event.target,
                //       // event.target.className,
                //       record,
                //       recordIndex
                //     );
                //   },
                // })}
              />
            </div>
          </Dropdown>
        </DataProviderCompA>

        <Space
          size={2}
          style={{ marginTop: 5, display: "flex", justifyContent: "right" }}
        >
          <Button
            size="small"
            type="primary"
            onClick={() => {
              const newRow = {
                colNAME: "Cường" + source.length,
                colSEX: true,
                colAGE: source.length,
              };

              // DataClient(
              //   {
              //     ...dataBaseAPI.POST_CREATE,
              //     data: {
              //       xid: "4652",
              //       project: "",
              //       owner: "",
              //       sheet: "",
              //       values: newRow,
              //     },
              //   },
              //   setDataState,
              //   (respone) => {
              //     setSource([...source, newRow]);
              //   }
              // );
            }}
          >
            <MenuUnfoldOutlined /> Add row
          </Button>
          <Button size="small" type="primary">
            <AppstoreFilled /> Design
          </Button>
          <Dropdown size="small" menu={menuProps} onClick={handleButtonClick}>
            <Button
              size="small"
              type="primary"
              style={{
                // boxShadow: "0 2px 0 rgb(5 61 58 / 34%)",
                backgroundColor: "darkcyan",
              }}
            >
              <CaretRightOutlined />
              Script
            </Button>
          </Dropdown>
          {/* <Button
            size="small"
            danger
            type="primary"
            style={{ boxShadow: "0 2px 0 rgb(5 61 58 / 34%)" }}
          >
            <BorderOutlined /> Empty datas
          </Button> */}
        </Space>

        <div
          style={{
            position: "absolute",
            bottom: "8%",
            width: "100%",
            left: 0,
            textAlign: "center",
          }}
        >
          <Space size={1}>
            <DataProviderCompA provider={sheetState}>
              <Dropdown.Button
                style={{ justifyContent: "center" }}
                menu={menuProps}
                onClick={handleButtonClick}
              >
                <Space>
                  <span>
                    {/* <CaretRightOutlined /> */}
                    Quản lý kho
                  </span>
                  <Tooltip title="Invisible colums">
                    <EyeInvisibleOutlined />
                    10
                  </Tooltip>
                </Space>
              </Dropdown.Button>
            </DataProviderCompA>

            {Object.keys(changeLogs).length > 0 && (
              <Badge count={Object.keys(changeLogs).length}>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    setRightDrawerState({
                      open: true,
                      title: `Change logs`,
                      content: <ChangeLogs />,
                    });
                  }}
                >
                  <Tooltip title="Unsave">
                    <FileExcelOutlined />
                  </Tooltip>
                </Button>
              </Badge>
            )}
          </Space>
        </div>
      </Content>

      <Drawer
        title={rightDrawerState.title}
        placement="right"
        closable={true}
        onClose={() =>
          setRightDrawerState({
            open: false,
            title: "",
            content: <></>,
          })
        }
        open={rightDrawerState.open}
        size="small"
      >
        {rightDrawerState.content}
      </Drawer>
    </>
  );
};

export default SheetPage;
