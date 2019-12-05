import React from 'react'
import './index.css'
import {connect} from 'react-redux'
import {getRank} from '../../store/rank.redux'

@connect((state)=>({
    data:state.rank.data,
}),{
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
    toggle=(index)=>{
       console.log(index)
    }
    render(){
        return (<div className="rank">
        <ul>
            {this.props.data && this.props.data.map((val,index)=>{
              return   <a href={'/#/songList/'+val.id} key={val.id} onClick={()=>this.toggle(index+1)}>
              <li>
          <p className="ph_img">
           <img src={val.picUrl}/>
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
            })}
     
        </ul>
        </div>)
    }
}
export default Rank