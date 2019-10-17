import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Form, Icon, Input, Button, message, Checkbox } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqLogin } from '../../api'
import './login.less'

const Item = Form.Item

class Login extends Component {
  handleSubmit = e => {
    // 阻止事件的默认行为: 阻止表单的提交
    e.preventDefault()
    // 对表单所有字段进行统一验证
    this.props.form.validateFields(async (err, {username, password}) => {
      if (!err) {
        // alert(`发登陆的ajax请求, username=${username}, password=${password}`)
        const result = await reqLogin(username, password)
        if (result.status===0) {// 登陆成功
          // 将user信息保存到local
          const user = result.data
          // localStorage.setItem('user_key', JSON.stringify(user))
          storageUtils.saveUser(user)
          // 保存到内存中
          memoryUtils.user = user
          // 并跳转到管理界面
          this.props.history.replace('/admin')
          message.success('登陆成功!')
        } else { // 登陆失败
          message.error(result.msg)
        }
        

      } else {
        // alert('验证失败!')
      }
    })
  }
  validatePwd = (rule, value, callback) => {//对密码进行自定义验证
    // 1).必须输入
    // 2).必须大于等于4位
    // 3).必须小于等于12位
    // 4).必须是英文、数字或下划线组成
    value = value.trim()
    if (!value) {
      callback('密码必须输入')
    } else if (value.length<4) {
      callback('密码不能小于4位')
    } else if (value.length>12) {
      callback('密码不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
  }
  render() {
    // 读取保存的user, 如果存在, 直接跳转到管理界面
    // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
    const user = memoryUtils.user
    if (user._id) {
      return <Redirect to="/" /> // 自动跳转到指定的路由路径
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="login-content">
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', { 
                  initialValue: '', // 初始值
                  rules: [ // 声明式验证: 使用插件已定义好的规则进行验证
                    { required: true, whitespace: true, message: '用户名是必须' },
                    { min: 4, message: '用户名不能小于4位'},
                    { max: 12, message: '用户名不能大于12位'},
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'}
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '', // 初始值
                  rules: [
                    { validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }             
            </Form.Item>
            <Form.Item>
            {
                getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
                })(
                <Checkbox>记住密码</Checkbox>
                )}
                <a className="login-form-forgot" href="#">
                    忘记密码
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </Form.Item>
          </Form>
          <Link to="/index/register">注册账户</Link> 
        </div>
      </div>
    )
  }
}

const WrapperForm = Form.create()(Login)

export default WrapperForm 