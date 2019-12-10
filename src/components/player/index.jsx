import React from 'react';
import './index.css';
import { connect } from 'react-redux'
import { getPlayer, getSongList, songImg, songLrc,prevSong,nextSong } from '../../store/player.redux'


@connect((state) => ({
  songUrl: state.player.songUrl,
  currentSong: state.player.currentSong,
  albumImgUrl: state.player.albumImgUrl,
  singerAvatarUrl: state.player.singerAvatarUrl,
  lyric: state.player.lyric
}), {
  getPlayer, getSongList, songImg, songLrc,prevSong,nextSong
})
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      isMuted: false,
      speed:1.0,
      showSpeed:false,
      duration:'00:00',
      currentTime:'00:00',
      currentLineNum:0,
      list:[]
    };
  }
  componentDidMount() {
    this.props.getSongList(this.props.match.params.songMid)
    this.props.getPlayer(this.props.match.params.songMid)
    
   if(this.state.playing){
    this.refs.audio.play()
   }

    let audio = this.refs.audio;

    this.setState({
      list:this.refs.inner.getElementsByTagName('p')
    })

    //只要媒体正在播放，这个时间就会一直触发
    audio.ontimeupdate=()=>{
      //audio.currentTime:媒体的播放进度
      //audio.duration:当前媒体的总时长（秒）
    this.setState({
      currentTime:this.secondsConvertHours(audio.currentTime),
      duration:this.secondsConvertHours(audio.duration)
    })

    // 歌词播放 （通过时长）
    const list=this.state.list
    for(let i =0;i<list.length;i++){
    //  console.log(list[i])
     const time=parseInt(list[i].getAttribute('time'))
     if(parseInt(audio.currentTime)===time){
         this.setState({
           currentLineNum:i
         },()=>{
           this.refs.inner.style.marginTop=i*-60+'px'
         })
        }
      }
   }
  }
  //将秒转换成分钟：秒，标准格式
  secondsConvertHours(seconds){
    if(isNaN(seconds)) return '00:00';
    let min =parseInt(seconds/60)>10?parseInt(seconds/60):'0'+parseInt(seconds/60)
    let sec =parseInt(seconds%60)>10?parseInt(seconds%60):'0'+parseInt(seconds%60)
    return min+':'+sec
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentSong && nextProps.currentSong.songName!==this.props.currentSong.songName){
    const albumMid = nextProps.currentSong.albumMid;
    const singerMid = nextProps.currentSong.singer[0].singerMid
    //  console.log(albumMid,singerMid)
    this.props.songImg(albumMid, singerMid)
    this.props.getPlayer(nextProps.currentSong.songMid)
    this.props.songLrc(nextProps.currentSong.songId)
    this.setState({
      playing:true
    })
  } 
}
  // 暂停与播放
  play = () => {
    this.setState({
      playing: !this.state.playing
    },()=>{
       // audio自动播放
    const audio = this.refs.audio
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
    })
  }
  // 速度下拉框的切换
  speedShow=()=>{
    this.setState({
      showSpeed:!this.state.showSpeed
    })
  }
  // 速度修改
  setSpeed=(newSpeed)=>{
   this.refs.audio.playbackRate=newSpeed
   this.setState({
      speed:newSpeed
   })
  }
  // 音量
  muted=()=>{
   this.setState({
     isMuted:!this.state.isMuted
   })
   this.refs.audio.muted=this.state.isMuted
  }
  render() {
    // 解构
    const { currentSong, albumImgUrl, singerAvatarUrl } = this.props
    return (
      <div className="player">
        <div className="playHead">
          <p className="p1">
            <img
              src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000"
              alt="" />
          </p>
          <p className="p2">千万正版音乐,海量无损曲库</p>
          <p className="p3">立即使用</p>
        </div>
        <div className="playInfo">
          <div className="loging"></div>
          {/* 背景图 */}
          <p className="songPic" style={{ backgroundImage: 'url(' + albumImgUrl + ')' }}>
          </p>
          <div className="playVideo">
            <div className="play_song">
              <p className={'singerPic1 '+(this.state.playing?'':'pause')}>
                {/* 歌手头像 */}
                <img src={singerAvatarUrl} alt=''/>
              </p>
              {/* 歌手名称 */}
              <p className="play_songName">{currentSong.songName}</p>
              <p className="play_singeName">
                {/* 歌曲名 */}
                {
                  currentSong.singer && currentSong.singer.map(s => {
                    return <span key={s.singerMid}>
                      {s.singerName}
                    </span>
                  })
                }
              </p>
            </div>
            <div className="lrc">
              <div className="lrc_box">
                <div className="inner" style={{ top: '100px' }} ref="inner">
                  {/* 歌词 */}
                  {
                   this.props.lyric && this.props.lyric.map((s,index)=>{
                       return <p  time={s.time} key={index+1} className={this.state.currentLineNum===index?'active':''} ref="lyricList">{s.lrc}</p>
                    })
                  } 
                </div>
              </div>
            </div >
            <div className="audioBox">
              <audio loop autoPlay src={this.props.songUrl} ref="audio"></audio>
              <h2 className="play_btn_songname">
                {currentSong.songName} | 歌手 :
                {/* 歌手名 */}
               {
                  currentSong.singer && currentSong.singer.map(s => {
                    return <span key={s.singerMid}>
                      {s.singerName}
                    </span>
                  })
                }
              </h2 >
              <div className="play_btn_box">
                <p className="preve iconfont icon-zuobofang" onClick={this.props.prevSong}></p>
                <p className={'iconfont bofang ' + (this.state.playing?'icon-bofang2':'icon-bofang1')} onClick={this.play}></p >
                <p className="next iconfont icon-youbofang" onClick={this.props.nextSong} ></p >
              </div >
              {/* 音量 */}
              <div className="play_acound">
                <p className={'iconfont muted ' + (this.state.isMuted ? 'icon-jingyin' : 'icon-yinliang')} onClick={this.muted}></p>
                <div className="acoundBox" ref="progressBar" onClick={this.volumeChange} >
                  <div className="acoundJindu" ref="progress"></div>
                </div >
              </div >
              {/* 进度 */}
              <div className="play_plan_box">
                <div className="play_plan" onClick={this.updateCurrentTime}>
                  <div className="play_plan_aa" style={{ width: '100%' }}></div>
                </div >
                <p className="play_time">{this.state.currentTime} / {this.state.duration}</p>
              </div >
              {/* 速度 */}
              <div className="speedBox">
                <span onClick={this.speedShow}>倍速</span>
                <b ref="speedBox">{this.state.speed}</b>
                <div className="speed_cont speed_cont1" hidden={!this.state.showSpeed}>
                  <p spedd="0.5" className={this.state.speed===0.5?'sppedOn':''} onClick={() => this.setSpeed(0.5)}>0.5</p>
                  <p spedd="1" className={this.state.speed===1.0?'sppedOn':''} onClick={() => this.setSpeed(1)} > 1.0</p >
                  <p spedd="1.5" className={this.state.speed===1.5?'sppedOn':''} onClick={() => this.setSpeed(1.5)} > 1.5</p >
                  <p spedd="2" className={this.state.speed===2.0?'sppedOn':''} onClick={() => this.setSpeed(2)} > 2.0</p >
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
    )
  }
}
export default Player