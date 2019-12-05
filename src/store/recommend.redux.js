import {RECOMMEND} from '../api'

export default(state,action)=>{
    state = state || {slider:[],radioList:[]}
    switch(action.type){
      case 'INIT':
        return {slider:action.slider,radioList:action.radioList}
        default :
        return state
    }
}

export const getRecommend=()=>(dispatch)=>{
//   ajax获取数据
  fetch(RECOMMEND).then((data)=>data.json()).then((res)=>{
   console.log(res)
    // dispatch将数据回传至仓库
  dispatch({type:'INIT',slider:res.data.slider,radioList:res.data.radioList})
  })
  
}