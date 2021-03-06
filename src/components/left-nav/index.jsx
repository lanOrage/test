import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon, Button  } from 'antd'
import PropTypes from 'prop-types'

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu

class LeftNav extends Component {
  static propTypes={
    collapsed:PropTypes.bool.isRequired
  }
  //判断当前用户是否有此item对应的权限
  hasAuth  = (item) => {
    // 得到当前用户的所有权限
    const user = memoryUtils.user
    const menus = user.role.menus
    // 1. 如果当前用户是admin
    // 2. 如果item是公开的
    // 3. 当前用户有此item的权限
    if (user.username === 'admin' || item.public || menus.indexOf(item.key)!==-1) {
      return true
    } else if (item.children) {
      // 4. 如果当前用户有item的某个子节点的权限, 当前item也应该显示
      const cItem = item.children.find(cItem => menus.indexOf(cItem.key)!==-1)
      return !!cItem 
    }
    return false
  }
  // 根据指定菜单数据列表产生<Menu>的子节点数组:使用 reduce() + 递归
  getMenuNodes2 = (menuList) => {
    // 得到当前请求的path
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      // 判断当前用户是否有此item对应的权限
      if (this.hasAuth(item)) {
        // 添加<Menu.Item></Menu.Item>
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else { // 添加<SubMenu></SubMenu>
          // 如果当前请求路由与当前菜单的某个子菜单的key匹配, 将菜单的key保存为openKey
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
          if (cItem) {
            this.openKey = item.key
          }
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes2(item.children)}
            </SubMenu>
          ))
        }
      }
    
      return pre
    }, [])
  }
  /* 
  第一次render()之后执行一次
  执行异步任务: 发ajax请求, 启动定时器
  */
  componentDidMount () {
    // this.menuNodes = this.getMenuNodes2(menuList)
  }
  /* 
  第一次render()之前执行一次
  为第一次render()做一些同步的准备工作
  */
  componentWillMount () {
   this.menuNodes = this.getMenuNodes2(menuList)
  }
  render() {
    // 得到当前请求路径, 作为选中菜单项的key
    let selectKey = this.props.location.pathname // /product/xxx
    if (selectKey.indexOf('/product')===0) {
      selectKey = '/product'
    }
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="logo"/>
          {this.props.collapsed?null:<h1>后台管理</h1>}
        </Link>
        <div>
          {/* 
          defaultSelectedKeys: 总是根据第一次指定的key进行显示
          selectedKeys: 总是根据最新指定的key进行显示
          */}
          <Menu
            selectedKeys={[selectKey]}
            defaultOpenKeys={[this.openKey]}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.props.collapsed}
          >
            { this.menuNodes }
          </Menu>
        </div>
      </div>
    )
  }
}

export default withRouter(LeftNav)
