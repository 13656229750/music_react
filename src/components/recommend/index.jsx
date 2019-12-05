import React from 'react'
import './index.css'
import {connect} from 'react-redux'
import {getRecommend} from '../../store/recommend.redux'
import {Carousel} from 'antd'
@connect((state)=>({
    slider:state.recommend.slider,
    radioList:state.recommend.radioList
}),{
    getRecommend
})
 class Recommend extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    componentDidMount(){
        this.props.getRecommend()
    }
    render(){
        return (<div className="recommend">
        {/* 轮播图 */}
        <div className="banner">
        <Carousel autoplay>
          {this.props.slider && this.props.slider.map((slider,index)=>{
                return <div key={index}><img src={slider}/></div>
            })}
        </Carousel>
           
        </div>
        {/* 电台 */}
        <div className="station">
        <h2 className="sta_title">电台</h2>
        <ul>
        {/* 服务端有问题,无法接收真实电台的歌单ID,所以固定为26 */}
        {this.props.radioList && this.props.radioList.map((radio,index)=>{
            return  <li key={radio.id}>
        <div>
           <img src={radio.picUrl}/>
        <span className="iconfont icon-bofang"></span>
        </div>
        <h2 className="station_name">{radio.title}</h2>
        </li>
        })}
        <a href="/#/songList/26">
       
        </a>
        </ul>
        </div>
        {/* 底部 */}
        <div className="foot">
        <p className="foot_computer">
        <a href="https://y.qq.com/?ADTAG=myqq&amp;nomobile=1#type=index">查看电脑版网页</a>
        </p>
        <p className="foot_logo">
        <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt=""/>
        </p>
        <div className="copyright">
        <p>Copyright © 1998 - Tencent. All Rights Reserved.</p>
        <p>联系电话：0755-86013388 QQ群：55209235</p>
        </div>
        </div>
        </div>)
    }
}
export default Recommend