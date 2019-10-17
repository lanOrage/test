import React, { Component } from 'react'
import { withRouter,  Link } from 'react-router-dom'
import { Modal, Icon, Menu, Divider  } from 'antd'
import PropTypes from 'prop-types'

import {reqWeather} from '../../api'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './index.less'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})
const { SubMenu } = Menu
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', // 天气图片url
    weather: '', // 天气文本
    openKeys:[],
  }
  static propTypes={
    collapsed:PropTypes.bool.isRequired,
    toggle:PropTypes.func.isRequired
  }
  onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
      });  
  };
// 退出登录
  logout = () => {
    // 显示确认提示
    Modal.confirm({
      title: '确认退出吗?',
      onOk: () => {
        console.log('OK');
        // 确定后, 删除存储的用户信息
        // local中的
        storageUtils.removeUser()
        // 内存中的
        memoryUtils.user = {}
        // 跳转到登陆界面
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
// 根据当前请求的path得到对应的title
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuList.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
      
    })

    return title
  }
// 获取天气信息显示
  getWeather = async () => {
    // 发请求
    const { dayPictureUrl, weather } = await reqWeather('福州')
    // 更新状态
    this.setState({
      dayPictureUrl, 
      weather
    })
  }
  componentDidMount () {
    // 启动循环定时器
    this.intervalId = setInterval(() => {
      // 将currentTime更新为当前时间值
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000);
    // 发jsonp请求获取天气信息显示
    this.getWeather()
  }
  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }
  render() {
    const { currentTime, dayPictureUrl, weather } = this.state 
    const user = memoryUtils.user
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <Icon className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggle}
          />
          <Menu
              mode="inline"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              className="header-adminset"
          >
              <SubMenu
                key="admin-set"
                title={
                  <span>
                    <Icon type="home" />
                    <span>欢迎, {user.username}</span>
                  </span>
                }
              >
                <Menu.Item key="1"><Icon type="setting" theme="filled" />设置</Menu.Item>
                <Menu.Item key="2"><Icon type="form" />个人资料</Menu.Item>
                <Divider/>
                <Menu.Item key="3" onClick={this.logout}> <IconFont type="icon-tuichu" />
                  退出
                </Menu.Item>
              </SubMenu>
          </Menu>
        </div>
        <Divider className='header-divider'/>        
        <div className="header-bottom">
          <div className='header-bottom-home'>
            <Link to="/home"><Icon type="home" />&nbsp;首页</Link>
          </div>
          <div className="header-bottom-left">
          {title}
          </div>
          <div className="header-bottom-right">
            {/* 显示时间，天气（图片&文本 */}
            <span>{ currentTime }</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
