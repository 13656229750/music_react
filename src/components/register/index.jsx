
import React from "react"
import '../login/index.css'
import user from '../../assets/img/user.png'
import password from '../../assets/img/password.png'
import wechat from '../../assets/img/wechat-login.png'


export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            history:JSON.parse(localStorage.getItem('search')) || []   //历史数据默认为空数组
        }
    }
    send=()=>{
        const list =JSON.parse(localStorage.getItem('search')) || []
        const name=this.refs.username.value.trim()
        const pass=this.refs.pass.value.trim()
        const password=this.refs.password.value.trim()
        const email=this.refs.email.value.trim()
        if(name === '' || pass === '' || email === '' || password === ''){
            alert('所填项不能有空')
        }else if(pass !== password ){
           alert('两次输入密码不一致')
        }else{
             list.push(name,pass,password,email) 
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
            <div className="login-bg">
            <div className="login-contain">
                <div className="login-header">
                    <p>注册</p>
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
                        <input id="password" type="password" placeholder="请输入密码" ref='pass'/>
                    </div>

                    <div className="form-item">
                        <label htmlFor="password">
                          <img src={password} alt="" />
                        </label>
                        <input id="repass" type="password" placeholder="请再次输入密码" ref='password'/>
                    </div>   
                    <div className="form-item">
                        <label htmlFor="password">
                        <img src={wechat} alt=""  />
                        </label>
                        <input id="email" type="text" placeholder="请输入邮箱" ref='email'/>
                    </div>                        

                </div>
                <div className="button-group">
                    <button className="login-btn" id="doLogin" onClick={this.send}>注册</button>
                    <button className="login-btn" id="doLogin"
                    onClick={this.quxiao}>取消</button>
                </div>

            </div>
        </div>
  
        )
    }
}