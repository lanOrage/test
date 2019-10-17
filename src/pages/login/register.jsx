import React, { Component } from 'react'
import {  Form, Input, Tooltip, Icon, Button } from 'antd'

import './register.less'

class Register extends Component {
  state={
    confirmDirty: false,
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        /*
        Received values of form:  
        {
        confirm: "123456"
        email: "9635@qq.com"
        password: "123456"
        phone: "12345678912"
        username: "asfsdgwe"
        }
        */
        // const result = await reqAddOrUpdateUser(values)//传递整个注册信息对象
        // if (result.status===0) {// 后台验证成功（没有被注册过
        //   message.success('注册成功!')
        //   // 跳转到登录页面进行登录
        //   return <Redirect to='/index/login'/>
        // }
    }
    })
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    value = value.trim()
    if (!value) {
      callback('密码必须输入')
    } else if (value.length<4) {
      callback('密码不能小于4位')
    } else if (value.length>12) {
      callback('密码不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    return (
      <div className="register">
        <div className="register-content">
          <h1>用户注册信息</h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register-form">
                <Form.Item
                    label={
                        <span>
                        Username&nbsp;
                        <Tooltip title="你想要人家怎么叫你?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                        </span>
                    }
                    >
                    {getFieldDecorator('username', {
                        initialValue: "",
                        rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        initialValue: "",
                        rules: [
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        initialValue: "",
                        rules: [
                        {
                            required: true,
                            message: '请确认密码!',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item label="Phone Number">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入手机号!' }],
                  })(<Input addonBefore="+86" style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                        {
                            type: 'email',
                            message: '邮箱格式不正确!',
                        },
                        {
                            required: true,
                            message: '请输入邮箱!',
                        },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrapperForm = Form.create({name:'register'})(Register)

export default WrapperForm 