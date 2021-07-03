import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs, Button, Form, Input, Checkbox, Select } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage, formatMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';
import GoogleLogin from 'react-google-login';
import request from '@/utils/request';
import { googleClientId } from '../../../config';
import { Link } from 'react-router-dom';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('account');
  const intl = useIntl();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  const responseGoogle = async (value) => {
    console.log(value);
    const requestApi = request();
    try {
      const res = await requestApi('/auth/login', {
        method: 'POST',
        data: { token: value.tokenId },
      });
      if (res.code == 1) {
        console.log(res);
        localStorage.setItem('token', res.accessToken);
        window.location.href = '/list/basic-list';
      } else {
        alert('You are not the owner!');
      }
    } catch (e) {
      alert('You are not the owner!');
    }
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    console.log('Success:', values);
    const requestApi = request();
    const res = await requestApi('/auth/login', {
      method: 'POST',
      data: values,
    });
    console.log(res.code);
    if(res?.code == 0){
      localStorage.setItem('token', res.data.token);
      window.location = '/list/category';
    } else {
      alert('Wrong password');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.main} style={{ textAlign: 'center' }}>
       <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      <span>Register account here: </span>
      <Link to="register">Register</Link>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
