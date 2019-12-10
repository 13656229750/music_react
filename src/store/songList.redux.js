import {SONG_LIST} from '../api'

export default(state,action)=>{
    state = state || {song:{}}
    switch(action.type){
      case 'INIT':
        return {...state,song:action.song}
        default :
        return state
    }
}
export const getSonglist=(id)=>(dispatch)=>{
   //   ajax获取数据
  fetch(SONG_LIST+'/'+id).then((data)=>data.json()).then((res)=>{
   console.log(res)
    // dispatch将数据回传至仓库
  dispatch({type:'INIT',song:res.data})
  })
}




