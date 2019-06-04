import React, { Component } from 'react';
//import { Table } from 'antd';
import StandardTable from '@/components/StandardTable';
//import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
//import { Link } from 'react-router-dom';
/*const RegisterPage = () => {
  return <div>注册页面</div>;
}
const A = () => {
  return <div>A页面</div>;
}*/
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0
    };
  }
  componentDidMount() {
    this.getList({
      current: 1,
      limit: 10
    });
  }
  getList(param) {
    fetch('/user/list?offset=' + ((param.current - 1) * param.limit) + '&limit=' + param.limit, {
      method: 'GET'
    }).then(response => {
      if (!response.ok) { 
        return Promise.reject(response.statusText);
      }
      return response.json();
    }).then(rs => {
      if(rs.code == 0) {
        this.setState({
          data: rs.datas,
          total: rs.total
        });
      } else {
        this.setState({
          datas: [],
          total: 0
        });
      }
    });
  }
  onChange(pagination, filters, sorter) {
    let { current, pageSize } = pagination;
    this.getList({
      current: current,
      limit: pageSize
    });
  }
  render() {
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: this.state.total
    };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'nickname'
      }
    ];
    return (
      /*<Table
        dataSource={ this.state.data }
        pagination={ paginationProps }
        onChange={ this.onChange.bind(this) }
        columns={ columns }/>*/
      <StandardTable
        selectedRows={[]}
        //loading={loading}
        data={this.state.data}
        columns={columns}
        //onSelectRow={this.handleSelectRows}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}
export default User;
