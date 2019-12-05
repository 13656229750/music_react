import {RECOMMEND} from '../api'

export default(state,action)=>{
    state = state || {}
    switch(action.type){
        default :
        return state
    }
}

export const getRecommend=()=>(dispatch)=>{
//   ajax获取数据
  fetch(RECOMMEND).then((data)=>data.json()).then((res)=>{
   console.log(res)
  })
// dispatch将数据回传至仓库
 
}