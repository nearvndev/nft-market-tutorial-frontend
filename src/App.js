import 'regenerator-runtime/runtime'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router"
import { login, logout } from './utils'
import Routes from "./routes";
import './global.css'
import { Layout, Menu, Button, Dropdown } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import "./global.css";

const { Header, Content, Footer, Sider } = Layout;

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
    const location = useLocation();
    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={logout}>
                    Logout
                </div>
            </Menu.Item>
        </Menu>
    );

  return (
      <Layout style={{minHeight: '100vh'}}>
          <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                  console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
              }}
          >
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                  <Menu.Item key="/" icon={<VideoCameraOutlined />}>
                      <Link to={"/"}> Market Place </Link>
                  </Menu.Item>
                  <Menu.Item key="/profile" icon={<UserOutlined />}>
                      <Link to={"/profile"}> Collectibles </Link>
                  </Menu.Item>
              </Menu>
          </Sider>
          <Layout>
              <Header className="site-layout-sub-header-background" style={{padding: 15}} >
                  <div></div>
                  {
                      window.walletConnection.isSignedIn() ?
                          <Dropdown overlay={menu} placement="bottomLeft" arrow>
                              <Button type="primary" shape="round" icon={<UserOutlined />}>
                                  { window.accountId }
                              </Button>
                          </Dropdown>:
                          <Button onClick={login} type="primary" shape="round" icon={<UserOutlined />}>
                              Login
                          </Button>
                  }
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                  <div className="site-layout-background" style={{ paddingBottom: 24, paddingTop: 24, minHeight: 360 }}>
                      <Routes/>
                  </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>VBI Dev NFT Marketplace</Footer>
          </Layout>
      </Layout>
  )
}