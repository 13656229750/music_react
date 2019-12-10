import {SEARCH} from '../api'
export default(state,action)=>{
    state = state || {
        hot:['张杰','华宇乐坛十佳歌手','华晨宇','17岁的天空','胡歌'],
        page:{currentNumber:20,currentPage:1,totalNumber:0},
        songList:[]
}
    switch (action.type){
       case 'INIT':
        return {...state,page:action.page,songList:action.songList}
       default: 
       return state
    }
}

export const getSearch=(text)=>(dispatch)=>{
    //   ajax获取数据
   fetch(SEARCH+'/'+text).then((data)=>data.json()).then((res)=>{
    console.log(res)
     // dispatch将数据回传至仓库
   dispatch({type:'INIT',page:res.data.page,songList:res.data.songList})
   })
 }