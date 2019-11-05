import * as React from 'react';
import './App.css';

import {Icon, Layout, Menu} from "antd";
import {observer} from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import {NavLink, Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import {getRouteList, mainRoutes, RouteInfo} from "../routing";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";

@injectMainStore
@observer
class App extends React.Component<MainStoreInjected> {

  render() {

    const mainStore = this.props.mainStore!;
    const {initialized, loginRequired} = mainStore;

    if (!initialized) {
      return (
        <Centered>
          <Icon type="loading" style={{fontSize: 24}} spin={true}/>
        </Centered>
      )
    }

    if (loginRequired) {
      return (
        <Centered>
          <Login/>
        </Centered>
      )
    }

    return (
      <Layout className='main-layout'>
        <Layout.Header style={{height: '48px', lineHeight: '48px', padding: '0 12px'}}>
          <AppHeader/>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200}
                        breakpoint='sm'
                        collapsedWidth={0}
                        style={{background: '#fff'}}>
            <Menu mode="inline"
                  style={{height: '100%', borderRight: 0}}>
              <Menu.Item key="1">
                <NavLink to={'/'}><Icon type="home"/>Home</NavLink>
              </Menu.Item>
              {mainRoutes.map((route) =>
                <MenuItem key={route.menuLink} route={route}/>
              )}
            </Menu>
          </Layout.Sider>
          <Layout style={{ padding: '24px 24px 24px' }}>
            <Layout.Content>
              <Switch>
                <Route exact={true} path="/" component={HomePage}/>
                {getRouteList().map((route) =>
                  <Route key={route.pathPattern} path={route.pathPattern} component={route.component}/>
                )}
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

interface MenuItemParameters {
  route: RouteInfo;
}

function MenuItem({route, ...rest}: MenuItemParameters) {
  return (
    route.isMenu ? (
      <Menu.SubMenu title={route.caption} {...rest}>
        {route.subItems && route.subItems.map(subRoute =>
          <MenuItem key={subRoute.menuLink} route={subRoute} {...rest}/>
        )}
      </Menu.SubMenu>
    ) : (
      <Menu.Item {...rest}>
        <NavLink to={route.menuLink}>{route.caption}</NavLink>
      </Menu.Item>
    )
  )
}

export default App;
