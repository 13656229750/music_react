import {SONG_URL,LRC,ALBUM_IMG} from '../api'
export default(state,action)=>{
    state = state || {
    songUrl:sessionStorage.getItem('songUrl',action.songUrl) || '',
    list:JSON.parse(sessionStorage.getItem('songList')) || [],
    index:JSON.parse(sessionStorage.getItem('index')) ||-1,
    currentSong:JSON.parse(sessionStorage.getItem('currentSong')) || [],
    albumImgUrl:sessionStorage.getItem('songalbumImgUrlUrl') || '',
    singerAvatarUrl:sessionStorage.getItem('singerAvatarUrl') || '',
    lyric:JSON.parse(sessionStorage.getItem('lyric')) || [] }
    switch(action.type){
     case 'INIT':
         sessionStorage.setItem('songUrl',action.songUrl)
         return {...state,songUrl:action.songUrl}
     case 'PLAY_SONG_LIST': //音乐数据
         sessionStorage.setItem('songList',JSON.stringify(action.songList))
         return {...state,list:action.songList}  
     case 'SONGLIST_DATA': // 切换上下歌曲用的 数据的id
        const index= state.list.findIndex(s=>{  
             return s.songMid === action.songId
         })
         sessionStorage.setItem('currentSong',JSON.stringify(state.list[index]))
         sessionStorage.setItem('index',index)
         return {...state,index,currentSong:state.list[index]}
     case 'SONG_IMG':  //歌手头像及背景图
        sessionStorage.setItem('albumImgUrl',action.albumImgUrl)
        sessionStorage.setItem('singerAvatarUrl',action.singerAvatarUrl)
         return {...state,albumImgUrl:action.albumImgUrl,singerAvatarUrl:action.singerAvatarUrl}
     case 'SONGWORD':   //歌词
         sessionStorage.setItem('lyric',JSON.stringify(action.lyric))
         return {...state,lyric:action.lyric}
     case 'PREV_SONG':  //上一首
         var prevIndex=state.index>0?state.index-1:0;
         var prevSong=state.list[prevIndex]
         return {...state,index:prevIndex,currentSong:prevSong}
     case 'NEXT_SONG':  //下一首
         var nextIndex=state.index===state.list.length-1?0:state.index+1
         var nextSong=state.list[nextIndex]
         return {...state,index:nextIndex,currentSong:nextSong}
     default:
         return state
    }
}

export const getSongList=(songId)=>(dispatch)=>{  // 数据id
    dispatch({type:'SONGLIST_DATA',songId})
}

export const setSonglist=(list)=>(dispatch)=>{  // 歌单数据
    dispatch({type:'PLAY_SONG_LIST',songList:list})
}

export const getPlayer=(songId)=>(dispatch)=>{
   // ajax获取数据
   fetch(SONG_URL+'/'+songId).then((data)=>data.json()).then((res)=>{
    //    console.log(res)  
       dispatch({type:'INIT',songUrl:res.data[0]})
   })
}

export const songImg=(albumMid,singerMid)=>(dispatch)=>{ //歌手图及背景图
     fetch(ALBUM_IMG+'/'+albumMid+'/'+singerMid).then((data)=>data.json()).then(res=>{
        //  console.log(res) 
         dispatch({type:'SONG_IMG',albumImgUrl:res.data.albumImgUrl,singerAvatarUrl:res.data.singerAvatarUrl})
     })  
}

export const songLrc=(songId)=>(dispatch)=>{   //歌词  
    fetch(LRC+'/'+songId).then(data=>data.json()).then(res=>{
    // console.log(res.data.lyric)
    let arr=[];  //歌词转换
    let arr1=res.data.lyric.split('[换行]');
    for(let i in arr1){
     let s =arr1[i];
     let endIndex=s.indexOf(']');
     let time=s.substring(0,endIndex+1).replace('[','').replace(']','')
    //  将时间格式转换成秒存储 
    let min = parseInt(time.split(':')[0])*60
    let sec =parseFloat(time.split(':')[1])
    // 截取歌词内容
    let lrc = s.substring(endIndex+1,s.length)
    if(lrc.trim().length>0){
     arr.push({
         time:(min+sec).toFixed(2),lrc
     })
    }
    }
    dispatch({type:'SONGWORD',lyric:arr})
    // console.log(arr)
    })
}
 
export const prevSong=()=>(dispatch)=>{  //上一首
    dispatch({type:'PREV_SONG'})
}
export const nextSong=()=>(dispatch)=>{ //下一首
    dispatch({type:'NEXT_SONG'})
}