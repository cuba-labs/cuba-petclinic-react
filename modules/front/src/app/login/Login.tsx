import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import {Button, Form, Icon, Input, message} from "antd";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";

import './Login.css';
import logo from '../common/images/petclinic_logo_full.png';

@injectMainStore
@observer
class Login extends React.Component<MainStoreInjected> {

  @observable login: string = 'admin';
  @observable password: string = 'admin';
  @observable performingLoginRequest = false;

  @action
  changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    this.login = e.target.value;
  };

  @action
  changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.password = e.target.value;
  };

  @action
  doLogin = (e: FormEvent) => {
    e.preventDefault();
    this.performingLoginRequest = true;
    this.props.mainStore!.login(this.login, this.password)
      .then(action(() => {
        this.performingLoginRequest = false;
      }))
      .catch(action(() => {
        this.performingLoginRequest = false;
        message.error('login failed');
      }));
  };

  render() {
    return(
      <div className='Login'>
        <img src={logo} alt='logo' className='logo'/>
        <Form layout='vertical' onSubmit={this.doLogin}>
          <Form.Item style={{marginBottom: 0}}>
            <Input placeholder='Login'
                   autoFocus={true}
                   onChange={this.changeLogin}
                   value={this.login}
                   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                   size='large'/>
          </Form.Item>
          <Form.Item>
            <Input placeholder='Password'
                   onChange={this.changePassword}
                   value={this.password}
                   type='password'
                   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                   size='large'/>
          </Form.Item>
          <Form.Item>
            <Button type='primary'
                    htmlType='submit'
                    size='large'
                    block={true}
                    loading={this.performingLoginRequest}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;