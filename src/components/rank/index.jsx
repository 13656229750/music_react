import React from 'react'
import './index.css'
import {connect} from 'react-redux'
import {getRank} from '../../store/rank.redux'
import { Skeleton } from 'antd'

@connect((state)=>({
    // 仓库数据
    data:state.rank.data,
}),{
    // action
    getRank,
})
 class Rank extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    componentDidMount(){
        this.props.getRank()
    }
    render(){
        return (<div className="rank">
            <ul>
                {
                    (this.props.data && this.props.data.length>0)?this.props.data.map(val=>{
                        return (
                        <a href={'/#/songList/'+val.id} key={val.id}>
                <li>
                  <p className="ph_img">
                 <img src={val.picUrl} alt=''/>
                 <span className="iconfont icon-erji">{val.listenCount}</span>
                </p>
                  <div className="ph_song_list">
                <span className="iconfont icon-you"></span>
                 <h2>{val.title}</h2>
                {
              val.songList.map((value,index)=>{
               return <p key={index}>
                       {value.number}
              <span>{value.songName}</span> -{value.singerName}
              </p>
              })
                }
         </div>
                   </li>
                   </a>
                        )
                    }):
                 <div>
                 <Skeleton avatar paragraph={{ rows: 4 }} active />
                 <Skeleton avatar paragraph={{ rows: 4 }} active />
                 <Skeleton avatar paragraph={{ rows: 4 }} active />
                 <Skeleton avatar paragraph={{ rows: 4 }} active />
                 <Skeleton avatar paragraph={{ rows: 4 }} active />
                </div>
                 }
               </ul>
        </div>)
    }
}
export default Rank