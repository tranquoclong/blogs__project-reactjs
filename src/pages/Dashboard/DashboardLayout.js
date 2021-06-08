import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link, Switch, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Admin';
import Password from './Password';
import Profile from './Profile';

const { Header, Sider, Content } = Layout;

const ROUTES = [
  {
    title: 'Đổi mật khẩu',
    icon: <ProfileOutlined />,
    href: '/dashboard/password',
    exact: true,
    Component: Password
  },
  {
    title: 'Hồ sơ của tôi',
    icon: <SettingOutlined />,
    href: '/dashboard/profile',
    exact: true,
    Component: Profile
  },
  {
    title: 'Bảng điều khiển',
    icon: <UserOutlined />,
    href: '/dashboard',
    exact: false,
    Component: Dashboard,
  },
]

function DashboardLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  console.log("location", location);
  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={[location.pathname]}
          defaultSelectedKeys={['/dashboard']} 
        >
          {
            ROUTES.map(r => {
              return (
                <Menu.Item key={r.href} icon={r.icon}>
                  <Link to={r.href}>{r.title}</Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            {
              ROUTES.map(({ Component, href, exact }) => {
                return (
                  <Route path={href} exact={exact} key={href}>
                    <Component />
                  </Route>
                )
              })
            }
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout