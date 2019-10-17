import React,{Component} from 'react'
import { Route, Switch } from 'react-router-dom'

import Admin from '../admin/admin'
import IndexHome from '../index-home/indexhome'


// 主要用于切换前台门户网站和后台管理系统

export default class Protal extends Component{
    render(){
        return (
        <Switch>
            <Route path="/indexhome" component={IndexHome}/>
            <Route path='/admin' component={Admin} />
            <Redirect to="/indexhome"/>
        </Switch>
        )
    }
}