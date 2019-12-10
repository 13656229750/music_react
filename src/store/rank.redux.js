import {TOP_LIST} from '../api'

export default(state,action)=>{
    state = state || {data:[]}
    switch(action.type){
      case 'INIT':
        return {data:action.data}
        default :
        return state
    }
}

export const getRank=()=>(dispatch)=>{
//   ajax获取数据
  fetch(TOP_LIST).then((data)=>data.json()).then((res)=>{
   console.log(res);
    // dispatch将数据回传至仓库
    setTimeout(()=>{
      dispatch({type:'INIT',data:res.data})
    },1000)
  })
}