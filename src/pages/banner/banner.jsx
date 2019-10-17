import React, { Component } from 'react'
import { Card, Button, Icon, Table,message,Modal } from 'antd'
import LinkButton from '../../components/link-button'
import AddPic from './addpic'

export default class Banner extends Component {
    state = {
        pics: [], // 所有图片的数组
        loading: false, // 是否正在请求加载中
        showStatus: 0,
    }
    initColumns = () => {
        this.columns = [
          {
            title: '图片的名称',
            dataIndex: 'name',
          },
          {
            title: '操作',
            width: 300,
            render: <LinkButton onClick={(pic)=>{this.deletePic(pic)}}>删除</LinkButton>
          },
        ]
      }
    // deletePic = pic => {//还没写完
    //     // 显示确认提示
    //     Modal.confirm({
    //       title: '确认删除吗?',
    //       okType: 'danger',
    //       okText: '确认',
    //       cancelText: '取消',
    //       onOk: () => {
    //         console.log('OK');
    //         // 确定后发送请求删除图片！
    //         // 重新渲染
    //         this.getPics()
    //       },
    //       onCancel() {
    //         console.log('Cancel');
    //       },
    //     })
    // }
    // getPics  = async () => {
    //     // 显示loading
    //     this.setState({ loading: true })
    //     // 发异步ajax请求
    //     // const result = await reqPics()
    //     // 得到数据以后隐藏loading
    //     this.setState({ loading: false })
    //     if (result.status===0) { // 成功
    //       const pics = result.data
    //       this.setState({
    //         pics
    //       })
    //     } else {
    //       message.error('获取图片列表失败')
    //     }
    // }  
    // componentWillMount () {
    //     this.initColumns()
    //   }
    // componentDidMount () {
    //     this.getPics()
    //   }
    render(){
        const { pics, loading, showStatus } = this.state
        const pic = this.pics || {}
        const extra = (
            <Button type="primary" onClick={() => { 
            this.pics = null
            this.setState({ showStatus: 1 })
        }}>
            <Icon type="plus"/>
            添加
        </Button>
        )
        return (
            <Card extra={extra}>
            <Table 
              bordered={true}
              rowKey="_id"
              loading={loading}
              columns={this.columns}
              dataSource={[]}
              pagination={{ defaultPageSize: 4}}
            />
            <Modal
              title="添加图片" // 0: 不显示, 1: 显示添加
              visible={showStatus!==0}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              {/* 将子组件传递过来的form对象保存到当前组件对象上this.form */}
              <AddPic setForm={form => this.form = form} picName={pic.name}/>
            </Modal>
          </Card>
        )
    }
    handleOk = () => { // 点击确定的回调: 去添加图片
        // const {showStatus} = this.state
        // let result
        // if (showStatus===1) { // 添加图片
        //     // result = await reqAddPic(PicName)
        // } 
        // this.form.resetFields() // 重置输入数据
        // this.setState({ showStatus: 0 })
        // if (result.status===0) {
        //     this.getPics()
        //     message.success(action + '添加成功')
        // } else {
        //     message.error(action + '添加失败')
        // }
    }
    // 点击取消的回调
    handleCancel = () => {
        this.form.resetFields()
        this.setState({
          showStatus: 0
        })
    }
}
