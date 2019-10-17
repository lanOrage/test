import React,{Component} from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import IndexHome from '../index-home/indexhome'
import IndexCompany from '../index-company/indexcompany'
import IndexNews from '../index-news/indexnews'
import IndexProducts from '../index-products/indexproducts'
import IndexBrand from '../index-brand/indexbrand'
import Login from '../login/login'
import Register from '../login/register'
// import IndexHome from '../'

const { Header, Footer, Content } = Layout

// 主要用于展示各个路由对应的部分

export default class Index extends Component{
    state = {
        current: 'mail',
      };
    
    handleClick = event => {
        // console.log('click ', e);
        this.setState({
          current: event.key,
        });
    };
    render(){
        return (
        <Layout style={{ height: '100%' }}>
            <Header className="index-header">
                <Menu className="index-nav" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="home" className="index-nav-item">
                        <span>
                            <Icon type="caret-right" />
                            <Link to='/index/indexhome'>首页</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="company">
                        <span>
                        <Icon type="caret-right" />
                        <Link to='/index/indexcompany'>公司介绍</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="products">
                        <span>
                        <Icon type="caret-right" />
                        <Link to='/index/indexproducts'>产品展示</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="news">
                        <span>
                        <Icon type="caret-right" />
                        <Link to='/index/indexnews'>新闻动态</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="brand">
                        <span>
                        <Icon type="caret-right" />
                        <Link to='/index/indexbrand'>品牌招商</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="connect">
                        <span>
                        <Icon type="caret-right" />
                        <Link to='/联系我们'>联系我们</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <span>
                        <Icon type="caret-right" />
                        <Link to='/index/login'>登录</Link>
                        </span>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content  style={{ background: 'white', margin: '0 60px'}}>
                <Switch>
                <Route path="/index/indexhome" component={IndexHome}/>
                <Route path='/index/indexcompany' component={IndexCompany} />
                <Route path='/index/indexproducts' component={IndexProducts} />
                {/* 需要从数据库获取产品信息进行展示，
                同理不需要重新设置接口，和后台商品管理用同一张数据表即可
                主要展示：左边分类信息，右边商品信息 ，
                一开始是全部显示，但当点击不同分类信息时，搜索筛选对应分类的商品信息*/}
                <Route path='/index/indexnews' component={IndexNews} />
                <Route path='/index/indexbrand' component={IndexBrand} />
                {/* <Route path='/联系我们' component={Banner} /> */}
                <Route path='/index/login' component={Login} />
                <Route path='/index/register' component={Register} />
                <Redirect to="/index/indexhome"/>
                </Switch>
            </Content>
            <Footer>
                写一些有的没的~
            </Footer>
        </Layout>
        )
    }
}