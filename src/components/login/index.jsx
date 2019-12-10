import React from "react"
import './index.css'
import user from '../../assets/img/user.png'
import password from '../../assets/img/password.png'
import wechat from '../../assets/img/wechat-login.png'
// import qq from '../../assets/img/qq.jpg'

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            history:JSON.parse(localStorage.getItem('search')) || []   //历史数据默认为空数组
        }
    }
    submit=()=>{
 
        const list =JSON.parse(localStorage.getItem('search')) || []
        const name=this.refs.username.value.trim()
        const pass=this.refs.password.value.trim()
        if(name === '' || pass === ''){
            alert('账号或密码不能为空')
        }else{
            list.push(name,pass) 
            this.setState({
            history:list
           })
           localStorage.setItem('search',JSON.stringify(list))
           this.props.history.push('/recommend')
        }
    }
    quxiao=()=>{
        this.props.history.push('/recommend')
    }
    render(){
        return (
            <div className="login-bg" >
                <div className="login-contain">
                    <div className="login-header">
                        <p>欢迎登录</p>
                    </div>
                    <div className="form-group">
                        <div className="form-item">
                            <label htmlFor="username">
                                <img src={user} alt=''/>
                            </label>
                            <input id="username" type="text" placeholder="请输入账号" ref='username'/>
                        </div>
                        <div className="form-item">
                            <label htmlFor="password">
                                <img src={password} alt="" />
                            </label>
                            <input id="password" type="password" placeholder="请输入密码" ref='password'/>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="login-btn" id="doLogin" onClick={this.submit}>登录</button>
                        <button className="login-btn" id="doLogin" onClick={this.quxiao}>取消</button>
                    </div>

                    <div className="order-login">
                        <p className="order-login-line">其他登录方式</p>
                        <div className="order-login-box">
                            <div style={{display:'inline-flex',justifyContent:'space-around'}}>
                                <a href="#">
                                    <img src={wechat} alt=""  />
                                    <p>QQ登录</p>
                                </a>
                                <a href="#">
                                    <img src={wechat} alt=""  />
                                    <p>微信登录</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}