import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

// 添加图片
const Item = Form.Item
class AddPic extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    picName: PropTypes.string,
  }
  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('picName', {
              initialValue:'',
              rules: [
                {required: true, whitespace:true, message: '请上传图片'}
              ]
            })(
              <Input type="text" placeholder="请上传图片"></Input>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddPic)
