import React from "react"
import "./index.css"
import {connect} from 'react-redux'
import {getSonglist} from '../../store/songList.redux'

@connect((state)=>({
    song:state.songList.song,
    }),{
    getSonglist
    })
 class SongList extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return (
            <div className="songList">
            <div className="songListBox">
            <div className="loging"></div>
            <div className="headbox headbox2">
            <p className="p1">
            <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000"/>
            </p>
            <p className="p2">
            <span>戳我查看</span>
            </p>
            </div>
            <div className="songInfoBox">
            <div className="songInfo">
            <p className="song_pic">
            <img src=""/>
            </p>
            <h2 className="song_title"></h2>
           <h3 className="song_number">第170天</h3>
            <h3 className="song_time">更新时间: </h3>
            <span className="iconfont icon-you song_play"></span>
            </div>
            <div className="songList">
            <p className="songList_num">
            排行榜
            <span>共 首</span>
            </p>
            <ul>
            <li v-for="(song,index) in list" >
            <p className="songlist_index songlist_num3"></p>
            <div className="songlist_name">
            <p className="song_name"></p>
            <p className="singer_name">
            <span v-for="s in song.singer">
     
            </span>
            </p>
            </div>
            <p className="iconfont icon-download songList_xiazai"></p>
            </li>
            </ul>
            </div>
            </div>
            </div>
            </div>
        )
    }
}
export default SongList