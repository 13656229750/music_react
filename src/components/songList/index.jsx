import React from "react"
import "./index.css"
import {connect} from 'react-redux'
import {getSonglist} from '../../store/songList.redux'
import {setSonglist} from '../../store/player.redux'

// 两个参数  函数（必须一个return对象），对象
@connect((state)=>({
    song:state.songList.song,
    }),{
    getSonglist,setSonglist //setSonglist 歌单数据
    })
 class SongList extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){
        this.props.getSonglist(this.props.match.params.id)
    }
    goPlay=(songMid)=>{
    // 将当前歌单存储到player.yredux中，用于在播放的时候可以切歌
    this.props.setSonglist(this.props.song.songList)
    //  跳转到播放任务
    this.props.history.push('/player/'+songMid)
    }
    render(){
        const {song} =this.props
        console.log(song)
         if(!song || !song.topInfo){
            return <div></div>
        }
        return (
            <div className="songList">
            <div className="songListBox">
            <div className="loging"></div>
            <div className="headbox headbox2">
            <p className="p1">
            <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt=''/>
            </p>
            <p className="p2">
            <span>戳我查看</span>
            </p>
            </div>
            <div className="songInfoBox">
            <div className="songInfo">
            <p className="song_pic">
            <img src="http://y.gtimg.cn/music/photo_new/T003R300x300M0000045KoP13U9rU1.jpg" alt=''/>
            </p>
        <h2 className="song_title">{song.topInfo.listName}</h2>
        <h3 className="song_number">{song.topInfo.listName}第170天</h3>
        <h3 className="song_time">更新时间: {song.updateTime}</h3>
            <span className="iconfont icon-you song_play" style={{'position':'static'}}></span>
            </div>
            <div className="songList">
            <p className="songList_num">
            排行榜
            <span>共{song.totalSongNum} 首</span>
            </p>
            <ul>
                {
                song.songList.map((songlist,index)=>{
                    return  (
                      
                    <li  onClick={()=>this.goPlay(songlist.songMid)} key={songlist.songId}>
            <p className="songlist_index songlist_num3">{index+1}</p>
            <div className="songlist_name">
            <p className="song_name">{songlist.songName}</p>
            <p className="singer_name">
                {
                    songlist.singer.map((singer,index)=>{
                        return <span key={singer.singerMid}>
                            {singer.singerName}
                         </span>
                    })
                }
            </p>
            </div>
            <p className="iconfont icon-download songList_xiazai"></p>
            </li>)
                })}
            
            </ul>
            </div>
            </div>
            </div>
            </div>
        )
    }
}
export default SongList
