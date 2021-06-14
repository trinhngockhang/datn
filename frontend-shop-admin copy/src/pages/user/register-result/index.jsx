import { Button, Result } from 'antd';
import { FormattedMessage, formatMessage, Link } from 'umi';
import React from 'react';
import styles from './style.less';
const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">
        <FormattedMessage id="userandregister-result.register-result.back-login" />
      </Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      'Register successfully, please login!'
    }
    
    extra={actions}
  />
);

export default RegisterResult;
