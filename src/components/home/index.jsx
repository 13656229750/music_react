import React from 'react'
import './index.css'
import {NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Search from '../search'
import Recommend from '../recommend'
import Rank from '../rank'
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return (
    <div className="index">
    {/* <!-- 头部 --> */}
    <div className="headbox headbox1">
      <p className="p1">
        <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt='' />
      </p>
      <p className="p2">
        <span>下载APP</span>
      </p>
    </div>
    {/* <!-- 内容区域 --> */}
    <div className="conBox">
      {/* <!-- 导航区 --> */}
      <p className="nav">
        <NavLink to="recommend" activeClassName='select'>推荐</NavLink>
        <NavLink to="rank" activeClassName='select'>排行榜</NavLink>
        <NavLink to="search" activeClassName='select'>搜索</NavLink>
      </p>
      {/* <!-- 路由显示区域 --> */}
      <Switch>
      <Route path='/recommend' component={Recommend}></Route>
      <Route path='/rank' component={Rank}></Route>
      <Route path='/search' component={Search}></Route>
      <Redirect to='/recommend'></Redirect>
      </Switch>
    </div>
    {/* <!-- 尾部 --> */}
    <div className="bottom"><a href='http://y.qq.com/m/index.html'>安装QQ音乐，发现更多精彩</a></div>
  </div>
        )
    }
}

