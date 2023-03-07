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
  StopOutlined,
  CloseCircleOutlined,
  InsertRowLeftOutlined,
  InsertRowAboveOutlined,
  BorderVerticleOutlined,
  BorderHorizontalOutlined,
  FunctionOutlined,
  AppstoreAddOutlined,
  BorderInnerOutlined,
  NumberOutlined,
  SmallDashOutlined,
  OrderedListOutlined,
  TableOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import LayoutComp from "@components/base/LayoutComp";
import { Button, Col, Form, Row, Space, Tooltip, Tree } from "antd";
import { useState } from "react";

const x = 3;
const y = 2;
const z = 1;

const treeData = [
  {
    type: "ROW",
    children: [
      {
        type: "COL",
        children: [
          { type: "ROW", children: [] },
          {
            type: "ROW",
            children: [
              {
                type: "COL",
                children: [
                  {
                    type: "GRD",
                    children: [
                      { type: "FOM", component: { name: "name" } },
                      { type: "FOM", component: { name: "sex" } },
                    ],
                  },
                ],
              },
              {
                type: "COL",
                children: [
                  {
                    type: "GRD",
                    children: [
                      { type: "FOM", component: { name: "dob" } },
                      { type: "FOM", component: { name: "age" } },
                    ],
                  },
                ],
              },
              { type: "COL", children: [] },
            ],
          },
          { type: "ROW", children: [] },
        ],
      },
    ],
  },
];

const defaultData = [];
const generateData = (_source, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || defaultData;
  const keys = [];
  _source?.forEach((e, i) => {
    const key = `${preKey}-${i}`;
    tns.push({
      key,
      type: e.type,
      value: e,
      title: (
        <Space size={5}>
          {e.type == "GRD" ? (
            <BorderInnerOutlined />
          ) : e.type == "FOM" ? (
            <>
              <FunctionOutlined /> {e.component.name}
            </>
          ) : e.type == "ROW" ? (
            <BorderVerticleOutlined />
          ) : (
            <BorderHorizontalOutlined />
          )}
          :
          {_preKey && (
            <CloseCircleOutlined style={{ fontSize: "0.8em", color: "red" }} />
          )}
          {e.type != "FOM" &&
            (e.type == "GRD" ? (
              <Tooltip title="Insert function">
                <FunctionOutlined
                  style={{ fontSize: "0.8em", color: "darkgray" }}
                />
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Insert column">
                  <InsertRowLeftOutlined
                    style={{ fontSize: "0.8em", color: "darkgray" }}
                  />
                </Tooltip>
                {e.type == "COL" && (
                  <Tooltip title="Insert row">
                    <InsertRowAboveOutlined
                      style={{ fontSize: "0.8em", color: "darkgray" }}
                    />
                  </Tooltip>
                )}
                <Tooltip title="Insert grid">
                  <TableOutlined
                    style={{ fontSize: "0.8em", color: "darkgray" }}
                  />
                </Tooltip>
              </>
            ))}
        </Space>
      ),
    });

    keys.push(key);
  });

  if ((_source?.length ?? 0) <= 0) {
    return tns;
  }

  keys.forEach((k, i) => {
    tns[i].children = [];
    if ((_source[i]?.children?.length ?? 0) <= 0) return [];
    return generateData(_source[i].children, k, tns[i].children);
  });
};
generateData(treeData);

const FormPage = () => {
  const [viewMode, setViewMode] = useState("PC");
  // const [gData, setGData] = useState(defaultData);
  const [gData, setGData] = useState(defaultData);
  const [expandedKeys] = useState(["0-0", "0-0-0"]);
  const onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData([...data]);
  };

  return (
    <Row style={{ height: "100%" }}>
      <Col
        span={6}
        style={{ backgroundColor: "lightblue", height: "100%", padding: "5px" }}
      >
        <Tree
          className="draggable-tree"
          defaultExpandedKeys={expandedKeys}
          draggable
          // blockNode
          showLine={true}
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          treeData={gData}
          style={{ overflow: "auto" }}
        />
      </Col>
      <Col
        span={viewMode == "PC" ? 18 : viewMode == "TABLET" ? 8 : 6}
        style={{ padding: 5 }}
      >
        <Row>
          <Button size="small" type="text">
            <MenuFoldOutlined />
          </Button>
          <Space.Compact size="small">
            <Button size="small" onClick={(e) => setViewMode("PC")}>
              LAP/PC
            </Button>
            <Button size="small" onClick={(e) => setViewMode("TABLET")}>
              TABLET
            </Button>
            <Button size="small" onClick={(e) => setViewMode("MOBILE")}>
              MOBIlE
            </Button>
          </Space.Compact>
        </Row>
        <div
          style={{
            marginTop: 5,
            border: "1px solid lightgray",
            borderRadius: 5,
            padding: 5,
          }}
        >
          <Form
            // form={form}
            // layout="vertical"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
          >
            <LayoutComp source={defaultData} />
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default FormPage;
