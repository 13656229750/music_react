import  recommend from './recommend.redux'
import  player from './player.redux'
import rank from './rank.redux'
import search from './search.redux'
import songList from './songList.redux'
import {combineReducers} from 'redux'

// 将多个数据连接起来 所有原始数据都是跨域从接口proxy中获取的
export default combineReducers({recommend,player,rank,search,songList})