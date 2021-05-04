import { Tooltip, Tag, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const logout = () =>{
    localStorage.removeItem('token');
    window.location.href = '/user/login';
  }
  return (
    <div className={className} style={{marginTop: '2rem', marginRight: '2rem'}}>
      <Button color="primary" type="primary" onClick={() => {
        logout()
      }}>Log out</Button>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
