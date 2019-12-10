import React from 'react'
import './index.css'
import {connect} from 'react-redux'
import {getSearch} from '../../store/search.redux'
import music from '../../assets/img/music.png'
import {setSonglist} from '../../store/player.redux'
@connect((state)=>({
   hot:state.search.hot,
   page:state.search.page,
   songList:state.search.songList
 }),{
     getSearch,setSonglist //歌单数据
 })
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state={
        showSongList:false,   //搜索出来的数据
        isSearch:false,       //取消或者搜索标签
        hotSearch:true,       //热门搜索数据
        history:JSON.parse(localStorage.getItem('search')) || []   //历史数据默认为空数组
        }
    }
    goPlay=(songMid)=>{
        // 将当前歌单存储到player.redux中，用于在播放的时候可以切歌
        this.props.setSonglist(this.props.songList)
        //  跳转到播放任务
        this.props.history.push('/player/'+songMid)
        }
    searching=(event)=>{   //input框 onfocus 
      this.refs.ipt.style.width='88%'
      this.setState({
          showHistory:true,
          hotSearch:false
      })
    }
    write=(event)=>{  // 判断input输入长度
       if(this.refs.searchInput.value.trim().length>0){
          this.setState({
              isSearch:true
          })
       }else{
        this.setState({
            isSearch:false
        })
       }
    }
    quxiao=()=>{  // 取消
       this.refs.ipt.style.width='96%'
       this.setState({
        showSongList:false,
        hotSearch:true,
        showHistory:false
    })
    }
    find=()=>{  // 搜索
     this.props.getSearch(this.refs.searchInput.value)
     this.setState({
         showSongList:true,
         hotSearch:false
     })
     this.saveHistory(this.refs.searchInput.value)
    }
    selectHot=(word)=>{  // 点击热门搜索的词
        this.saveHistory(word)
        this.props.getSearch(word)
        this.refs.ipt.style.width='88%'
        this.setState({
            showSongList:true,
            hotSearch:false
        })
    }
    saveHistory=(ci)=>{  // 历史记录
     const list =JSON.parse(localStorage.getItem('search')) || []
     if(list.indexOf(ci)===-1){
      list.push(ci)
     }
     this.setState({
        history:list
     })
     localStorage.setItem('search',JSON.stringify(list))
    }
    removeRecord=()=>{  // 删除历史记录
        localStorage.removeItem('search')
        this.setState({
            history:[],
            showHistory:false,
            hotSearch:true
        })
    }
    readRecord=(t)=>{ //  点击历史记录里面的词
      this.setState({
          showSongList:true,
          hotSearch:false,
          showHistory:false
      })  
      this.props.getSearch(t)
    }
    render(){
        return (<div className="searchBox">
        <div className="iptBox">
        <div className="ipt" ref="ipt">
        <span className="iconfont icon-sousuo" id="search"></span>
        <input type="search" placeholder="搜索歌曲、歌单、专辑" id="searchInput" ref="searchInput"  v-model="songName" onFocus={this.searching} onChange={this.write}
        />
        </div>
        <p className="callOff" hidden={this.state.isSearch} onClick={this.quxiao}>取消</p>
        <p className="callOff search_btn" hidden={!this.state.isSearch} onClick={this.find}>搜索</p>
        </div>
        <div className="searchBar" v-show="!isSongList">
        <div className="search_hisTory" hidden={!this.state.showHistory}>
        <div className="search_hisTory_box" >
          {
              this.state.history.map((h,i)=>{
                return    <p  key={i}
         onClick={()=>this.readRecord(h)}>
              {h}
            </p>
              })
          }
        <h1 onClick={this.removeRecord} v-show="searchRecord.length>0">删除历史搜索记录</h1>
        </div>
        </div>
        <div className="hotsearch" hidden={!this.state.hotSearch}>
        <h2 className="hotsearch_title">热门搜索</h2>
        <div className="hot_sea">
            {
              this.props.hot &&  this.props.hot.map((h,i)=>{
                return  <span className={i===0?'on':''}  key={i} onClick={()=>this.selectHot(h)}>
                     {h}
                 </span>
              })
            }
        </div>
        </div>
        </div>
        <div className="search_songList" hidden={!this.state.showSongList}>
        <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="30">
        {/* <Loading v-show="loading"></Loading> */}
        {
          this.props.songList &&  this.props.songList.map((song,index)=>{
                return (
               
                <li key={song.songId} onClick={()=>this.goPlay(song.songMid)}>
          <img src={music} style={{height:'50px',width:'50px',marginTop:'30px'}} alt=''/>
          <div className="search_song_name">
          <p className="search_song_name1">{song.songName}</p>
          <p className="search_song_name2">
            {
                song.singer.map(s=>{
                 return   <span key={s.singerMid}>
                 {s.singerName}
                 </span>
                })
            }
        </p>
        </div>
        <span>{index+1}</span>
        </li>)
            })
        }
        <li v-show="isEnd" className="isEnd">
        已经到底啦~
        </li>
        </ul>
        </div>
        </div>)
    }
}
export default Search