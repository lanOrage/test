import React,{Component} from 'react'
import { Link } from 'react-router-dom'
export default class LoginHome extends Component{
    render(){
        return (
            <nav class="navbar" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="logo" href="index.html">
                            <img class="logo" src="img/home/logo.png" alt=""/>
                            <h1>马克森橱柜</h1>
                        </a>
                    </div>
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right">
                            <li><Link class="active" href="#">首页</Link></li>
                            <li><Link href="profuile.html">公司介绍</Link></li>
                            <li><Link href="products.html">产品展示</Link></li>
                            <li><Link href="news.html">新闻动态</Link></li>
                            <li><Link href="join.html">品牌招商</Link></li>
                            <li><Link href="about.html">联系我们</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}