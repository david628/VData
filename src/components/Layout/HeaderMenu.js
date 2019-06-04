import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import { loginAction } from '../../action/login.action';
import './HeaderMenu.less';

@connect(
  state => state.login,
  dispatch => bindActionCreators(loginAction, dispatch)
)
class HeaderMenu extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  onMenuClick(e) {
    if(e.key === 'logout') {
      this.props.exit();
    }
  }
  render() {
    const { exit, user } = this.props;
    const collapsed = false;
    const menu = (
      <Menu selectedKeys={[]} onClick={this.onMenuClick.bind(this)}>
        <Menu.Item key="user">
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header-menu">
        <Icon
          className="header-menu-icon"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
        />
        <Dropdown overlay={menu} selectedKeys={[]}>
          <span style={{ position: 'absolute', right: 30, cursor: 'pointer' }}>
            <span>{ user && user.userName ? user.userName : "登录" }</span>
          </span>
        </Dropdown>
      </div>
    );
  }
}
export default HeaderMenu;