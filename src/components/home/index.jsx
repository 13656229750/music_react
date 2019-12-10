import React from "react"
import {NavLink,Route,Switch,Redirect} from "react-router-dom" //路由
import "./index.css"

import Recommend from "../recommend"
import Rank from "../rank"
import Search from "../search"


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return (
            <div className="index">
            <div className="headbox headbox1">
              <p className="p1">
                <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt=''/>
              </p>
              <p style={{textAlign:"center",marginLeft:'144px'}}>
              <NavLink to="login" activeClassName="select" style={{textAlign: 'center',lineHeight: '60px',fontSize: '30px'}}>登录</NavLink>|
              <NavLink to="register" activeClassName="select" style={{textAlign: 'center',lineHeight: '60px',fontSize: '30px'}}>注册</NavLink>
                </p>
              <p className="p2">
                <span>下载APP</span>
              </p>
            </div>

            <div className="conBox">

              <p className="nav">
                <NavLink to="recommend" activeClassName="select">推荐</NavLink>
                <NavLink to="rank"  activeClassName="select">排行榜</NavLink>
                <NavLink to="search"  activeClassName="select">搜索</NavLink>
              </p>
           {/* 子路由切换 */}
              <Switch>
               
                <Route path="/recommend" component={Recommend}></Route>
                <Route path="/rank" component={Rank}></Route>
                <Route path="/search" component={Search}></Route>
                <Redirect to="/recommend"></Redirect>
              </Switch>
           {/* 子路由切换 */}

            </div>

            <div className="bottom"><a>安装QQ音乐，发现更多精彩</a></div>
          </div>
        )
    }
}