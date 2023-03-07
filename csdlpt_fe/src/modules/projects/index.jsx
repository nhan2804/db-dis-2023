import {
  FilterFilled,
  SortAscendingOutlined,
  ClearOutlined,
  CaretDownOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Row,
  Col,
  Drawer,
  Button,
  Space,
  Tooltip,
  Input,
  Dropdown,
  Checkbox,
  Segmented,
  theme,
} from "antd";
import { useEffect, useRef, useState } from "react";

// import { projectBaseAPI, ProjectClient } from "../../../clients/ProjectClient";
import moment from "moment/moment";
import uuid from "react-uuid";
import {
  FilterExpressionComp,
  handleParseExpression,
} from "@components/base/FilterExpressionComp";
import {
  handleParseExpressionSort,
  SortExpressionComp,
} from "@components/base/SortExpressionComp";
import { MetaComp, PopoverComp, TextI18 } from "@components/base/CommonComp";
import { DataProviderCompA } from "@components/DataProviderComp_A";
import ColBlockCompA from "@components/BlockComp_A";
import DevToolActions from "@components/base/devtools/DevToolActions";
import PaginationComp from "@components/base/PaginationComp";
import FormComp from "@components/base/FormComp";
import { useCallback } from "react";
import useCreateProject from "./hooks/mutate/useCreateProject";
import useGetProject from "./hooks/query/useGetProject";
import CustomDrawer from "@components/CustomDrawer";
import FormEditProject from "./components/FormEditProject";
import useUpdateProject from "./hooks/mutate/useUpdateProject";
import useDeleteProject from "./hooks/mutate/useDeleteProject";

const { Content } = Layout;
const { useToken } = theme;

const defaultProjectSortSrc = [
  // { name: "name", sort: "ASC" }
];
const defaultProjectFilterSrc = {
  map: "AND",
  expressions: [],
  // expressions: [
  //   { name: "Name", condition: EXPRESSION_CONDITION.EQ, values: "A" },
  //   {
  //     map: "OR",
  //     expressions: [
  //       {
  //         name: "Name",
  //         condition: EXPRESSION_CONDITION.LT,
  //         values: "Y",
  //       },
  //       {
  //         name: "Title",
  //         condition: EXPRESSION_CONDITION.LK,
  //         values: "X",
  //       },
  //     ],
  //   },
  // ],
};
const defaultProjectPaging = {
  perPage: localStorage.getItem("perPage") ?? 20,
  page: 1,
};

let renderCounter = 0;
let effectCounter = 0;

const ProjectPage = () => {
  const { token } = useToken();

  const [debugStatusState, setDebugStatusState] = useState({
    content: "Debug/Status...",
  });
  const [bottomDrawerState, setBottomDrawerState] = useState({
    open: false,
    title: "",
    content: <></>,
  });
  const [rightDrawerState, setRightDrawerState] = useState({
    open: false,
    title: "",
    content: <></>,
  });

  // vars region ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  /** Project model regions */
  /** Provider state - effectived when data provider add, delete, update... refetch required */
  const [projectSchemaState, setProjectSchemaState] = useState([]);
  const [projectFilterState, setProjectFilterState] = useState({});
  const [projectSortState, setProjectSortState] = useState({});
  const [projectPagingState, setProjectPagingState] = useState(
    JSON.clone(defaultProjectPaging)
  );
  const [refetchProjectState, setRefetchProjectState] = useState(0);
  const [fetchProjectState, setFetchProjectState] = useState({}); // store process of new, update, delete state
  /**  */
  /** All component state, used for FE bind elements UI - not effectived with data provider */
  const [projectFilterSrcState, setProjectFilterSrcState] = useState(
    JSON.clone(defaultProjectFilterSrc)
  );
  const [projectSortSrcState, setProjectSortSrcState] = useState([
    ...defaultProjectSortSrc,
  ]);
  const [projectLastUpdateState, setProjectLastUpdateState] = useState();
  const [searchContentState, setSearchContentState] = useState({
    search: "",
    regex: false,
    unicode: true,
  });
  const [projectShareState, setProjectShareState] = useState("Private");

  const [projectsState, setProjectsState] = useState({}); // Store original fetch datas
  const [finalDatasState, setFinalDatasState] = useState([]); // Final data after Merge original datas with search content
  /**  */
  /** End project model regions */

  // Functions region ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const handleFilterSort = () => {
    setProjectFilterState(handleParseExpression(projectFilterSrcState));
    setProjectSortState(handleParseExpressionSort(projectSortSrcState));
  };
  const handleUpdateContent = useCallback(() => {
    let finalDatas = [];
    const key = searchContentState.unicode
      ? searchContentState.search
      : searchContentState?.search?.normal();
    projectsState.data?.payload.forEach((e) => {
      const values = projectSchemaState.data?.payload.map((s) => {
        // if (s.search(/(createdAt|updatedAt|avatar|bg|cover|icon)/i) != -1)
        //   return "✋";
        return searchContentState.unicode
          ? e[s.name] + ""
          : (e[s.name] + "").normal();
      });
      if (
        e.share == projectShareState &&
        ((!searchContentState.regex && key.includeMany(values)) ||
          (searchContentState.regex && key.searchMany(values)))
      ) {
        finalDatas.push(e);
      }
    });
    setFinalDatasState(finalDatas);
  }, [
    projectSchemaState,
    projectShareState,
    projectsState,
    searchContentState.regex,
    searchContentState.search,
    searchContentState.unicode,
  ]);
  renderCounter++;

  // init region ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    // ProjectClient(projectBaseAPI.GET_SCHEMA, setProjectSchemaState);
  }, []);

  // Independent region ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /** Update provider */
  useEffect(() => {
    process.env.REACT_APP_DEBUG &&
      console.log("[EFF Provider] ProjectsPage 1 ");
    // ProjectClient(
    //   {
    //     ...projectBaseAPI.POST_SEARCH,
    //     data: {
    //       filter: projectFilterState,
    //       sort: projectSortState,
    //       offset: (projectPagingState.page - 1) * projectPagingState.perPage,
    //       limit: projectPagingState.perPage,
    //     },
    //   },
    //   setProjectsState,
    //   (respone) => {
    //     setProjectLastUpdateState(moment());
    //   }
    // );

    effectCounter++;
  }, [
    projectFilterState,
    projectSortState,
    projectPagingState,
    refetchProjectState,
  ]);
  /**  */
  /** Update UI */
  useEffect(() => {
    process.env.REACT_APP_DEBUG && console.log("[EFF UI] ProjectsPage ");
    handleUpdateContent();

    effectCounter++;
  }, [
    projectsState,
    searchContentState,
    projectShareState,
    handleUpdateContent,
  ]);

  const refDrawerFormProject = useRef();
  const [selectedProject, setSelectedProject] = useState();

  const { mutate: create, isLoading: isLoadingCreate } = useCreateProject();
  const { data: projects } = useGetProject();
  const { mutate: update, isLoading: loadingUpdate } = useUpdateProject();
  const { mutate: deleteP, isLoading: loadingDelete } = useDeleteProject();
  const handleModify = (action, data) => {
    const _id = selectedProject?._id;
    if (action === "UPDATE") {
      update({ _id, formData: data });
    } else if (action === "DELETE") {
      deleteP({ _id });
    }

    refDrawerFormProject?.current?.close();
  };

  /**  */

  if (renderCounter > 300)
    return <>{window.location.href} renderCounter over 100 times</>;
  if (effectCounter > 100)
    return <>{window.location.href} effectCounter over 50 times</>;

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
                <b>{TextI18({ k: "_filter" })}:</b>{" "}
                {projectFilterSrcState.expressions.length <= 0 ? (
                  "‐"
                ) : (
                  <a href="f">{TextI18({ k: "_expressions" })}</a>
                )}
              </span>
              <span>
                <b>{TextI18({ k: "_sort" })}</b>{" "}
                {projectSortSrcState.length <= 0
                  ? "‐"
                  : projectSortSrcState.map((e) => {
                      return e.name + (e.sort == "ASC" ? "▲" : "▼") + " ";
                    })}
              </span>
              <span>
                <b>{TextI18({ k: "_update" })}</b>{" "}
                {projectLastUpdateState
                  ? projectLastUpdateState.format(
                      // <TextI18 key="_date.format" />
                      "dddd, MMMM Do YYYY, hh:mm:ss a"
                      // "YYYY MM DD H mm ss"
                    )
                  : "none"}
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
                onBlur={(e) => {
                  setSearchContentState({
                    ...searchContentState,
                    search: e.currentTarget.value,
                  });
                }}
              />
            </Space>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <Checkbox
                        defaultChecked={searchContentState.regex}
                        onChange={(e) => {
                          setSearchContentState({
                            ...searchContentState,
                            regex: e.target.checked,
                          });
                        }}
                      >
                        {TextI18({ k: "_regex.search" })}
                      </Checkbox>
                    ),
                    key: "0",
                  },
                  {
                    label: (
                      <Checkbox
                        defaultChecked={searchContentState.unicode}
                        onChange={(e) => {
                          setSearchContentState({
                            ...searchContentState,
                            unicode: e.target.checked,
                          });
                        }}
                      >
                        {TextI18({ k: "_ignore.unicode" })}
                      </Checkbox>
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
        <Row gutter={[8, 8]}>
          {projectShareState === "Private" && (
            // <DataProviderCompA provider={{ isFetching: isLoadingCreate }}>
            <DataProviderCompA provider={{ isFetching: isLoadingCreate }}>
              <ColBlockCompA
                title={TextI18({ k: "_new.profile" })}
                desc={TextI18({ k: "_click.start" })}
                icon={<PlusCircleOutlined />}
                share="Private"
                onClick={() => {
                  create({
                    xid: uuid(),
                    name: "_",
                    title: "_title",
                    description: "_description",
                    share: "Private",
                  });
                }}
              />
            </DataProviderCompA>
          )}
          <DataProviderCompA provider={projectsState}>
            {projects?.payload.map((e, i) => (
              <ColBlockCompA
                key={e._id}
                title={e.title == "_title" ? TextI18({ k: "_title" }) : e.title}
                desc={
                  e.description == "_description"
                    ? TextI18({ k: "_description" })
                    : e.description
                }
                {...e}
                onClick={() => {
                  refDrawerFormProject?.current?.open();
                  setSelectedProject(e);
                }}
              />
            ))}
          </DataProviderCompA>
        </Row>
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            width: "100%",
            left: 0,
            textAlign: "center",
          }}
        >
          <Segmented
            value={projectShareState}
            options={[
              {
                label: `${TextI18({ k: "_private" })}`,
                value: "Private",
              },
              {
                label: `${TextI18({ k: "_shared" })}`,
                value: "Shared",
              },
              {
                label: `${TextI18({ k: "_public" })}`,
                value: "Public",
              },
            ]}
            onChange={(e) => {
              setProjectShareState(e);
            }}
          />
        </div>
      </Content>

      {/* Bottom actions */}
      <Row style={{ marginTop: "5px", padding: "0 5px" }}>
        <Col span={8}>
          <Space size={0}>
            <PopoverComp
              content={
                <Row>
                  <Col span={24}>
                    <DataProviderCompA provider={projectSchemaState}>
                      <FilterExpressionComp
                        names={projectSchemaState.data?.payload}
                        source={projectFilterSrcState}
                        handleSetSource={setProjectFilterSrcState}
                      />
                      <Space
                        size={5}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "5px",
                        }}
                      >
                        <Button
                          size="small"
                          type="primary"
                          onClick={handleFilterSort}
                        >
                          {TextI18({ k: "_apply" })}
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          danger
                          onClick={() =>
                            setProjectFilterSrcState(
                              JSON.clone(defaultProjectFilterSrc)
                            )
                          }
                        >
                          <ClearOutlined size="small" />
                        </Button>
                      </Space>
                    </DataProviderCompA>
                  </Col>
                </Row>
              }
            >
              <Tooltip
                title={`${TextI18({ k: "_filter.data" })}`}
                placement="topLeft"
              >
                <Button icon={<FilterFilled />} />
              </Tooltip>
            </PopoverComp>
            <PopoverComp
              content={
                <Row>
                  <Col span={24}>
                    <DataProviderCompA provider={projectSchemaState}>
                      <SortExpressionComp
                        names={projectSchemaState.data?.payload}
                        source={projectSortSrcState}
                        handleSetSource={setProjectSortSrcState}
                      />
                      <Space
                        size={5}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "5px",
                        }}
                      >
                        <Button
                          size="small"
                          type="primary"
                          onClick={handleFilterSort}
                        >
                          {TextI18({ k: "_apply" })}
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          danger
                          onClick={() =>
                            setProjectSortSrcState([...defaultProjectSortSrc])
                          }
                        >
                          <ClearOutlined size="small" />
                        </Button>
                      </Space>
                    </DataProviderCompA>
                  </Col>
                </Row>
              }
            >
              <Tooltip title="Sort">
                <Button icon={<SortAscendingOutlined />} />
              </Tooltip>
            </PopoverComp>
            <Dropdown
              menu={{
                items: [
                  {
                    label: "Export",
                    key: "0",
                  },
                  {
                    label: "Share",
                    key: "1",
                  },
                  {
                    label: "Invite",
                    key: "2",
                  },
                  {
                    label: (
                      <a href="https://www.antgroup.com">Capture full size</a>
                    ),
                    key: "3",
                  },
                  {
                    label: <a href="https://www.aliyun.com">Record screen</a>,
                    key: "4",
                  },
                  {
                    type: "divider",
                  },
                  {
                    label: "Translate content datas",
                    key: "5",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Button>...</Button>
            </Dropdown>
          </Space>{" "}
          <DevToolActions setBottomDrawerState={setBottomDrawerState} />
        </Col>
        <Col span={8} style={{ textAlign: "center" }}>
          <MetaComp desc={debugStatusState.content} />
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <PaginationComp
            total={5}
            source={projectPagingState}
            handleSetSource={setProjectPagingState}
          />
        </Col>
      </Row>

      <CustomDrawer
        title={selectedProject?.title}
        key={selectedProject?.id + selectedProject?.updatedAt}
        ref={refDrawerFormProject}
        noButton={true}
      >
        {() => (
          <FormEditProject
            loadingDelete={loadingDelete}
            loadingUpdate={loadingUpdate}
            handleActions={handleModify}
            source={selectedProject}
          />
        )}
      </CustomDrawer>
      <Drawer
        title={bottomDrawerState.title}
        placement="bottom"
        closable={true}
        onClose={() =>
          setBottomDrawerState({
            open: false,
            title: "",
            content: <></>,
          })
        }
        open={bottomDrawerState.open}
        size="small"
      >
        {bottomDrawerState.content}
        {/* <TransComp /> */}
      </Drawer>
    </>
  );
};

export default ProjectPage;
