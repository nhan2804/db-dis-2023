import { Layout, Menu } from "antd";
import React, { Suspense, useState } from "react";
import { Outlet, useLocation, useMatch, useParams } from "react-router";
import {
  UserOutlined,
  UnorderedListOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BuildOutlined,
  InsertRowLeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "@hooks/reduxHook";
const { Sider, Content } = Layout;
const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const match = useMatch("/:page/*");
  const user = useAppSelector((s) => s?.auth?.user);
  // console.log(location);
  // return <Outlet />;

  return (
    <Layout>
      <Sider theme="light">
        <div className="logo" />
        <Menu theme="light" mode="inline" selectedKeys={[match?.params?.page]}>
          {user?.type === "ADMIN" && (
            <>
              {" "}
              <Menu.Item icon={<InsertRowLeftOutlined />} key={"departments"}>
                <Link to={`/departments`}>Khoa</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuUnfoldOutlined />} key={"doctors"}>
                <Link to={`/doctors`}>Bác sĩ</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="patients">
                <Link to={`/patients`}>Bệnh nhân</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="medical-records">
                <Link to={`/medical-records`}>Bệnh án</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="medicines">
                <Link to={`/medicines`}>Thuốc</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="services">
                <Link to={`/services`}>Dịch vụ</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="tickets">
                <Link to={`/tickets`}>Phiếu khám</Link>
              </Menu.Item>
              <Menu.Item icon={<UserOutlined />} key="users">
                <Link to={`/users`}>User</Link>
              </Menu.Item>
            </>
          )}
          {user?.type === "DOCTOR" && (
            <>
              {" "}
              <Menu.Item icon={<MenuUnfoldOutlined />} key={"doctors"}>
                <Link to={`/doctors`}>Bác sĩ</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="patients">
                <Link to={`/patients`}>Bệnh nhân</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="medical-records">
                <Link to={`/medical-records`}>Bệnh án</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="medicines">
                <Link to={`/medicines`}>Thuốc</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="services">
                <Link to={`/services`}>Dịch vụ</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="tickets">
                <Link to={`/tickets`}>Phiếu khám</Link>
              </Menu.Item>
            </>
          )}
          {user?.type === "PATIENT" && (
            <>
              <Menu.Item icon={<MenuFoldOutlined />} key="medical-records">
                <Link to={`/medical-records/my`}>Bệnh án</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="medicines">
                <Link to={`/prescriptions/my`}>Đơn thuốc</Link>
              </Menu.Item>
              <Menu.Item icon={<MenuFoldOutlined />} key="tickets">
                <Link to={`/tickets/my`}>Phiếu khám</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Sider>
      <Layout className="p-6 site-layout">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
