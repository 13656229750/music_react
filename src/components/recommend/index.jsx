import React from 'react'
import './index.css'
import {connect} from 'react-redux'
import {getRecommend} from '../../store/recommend.redux'
@connect(()=>({}),{
    getRecommend
})
 class Recommend extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    componentDidMount(){
        this.props.getRecommend()
    }
    render(){
        return (<div></div>)
    }
}
export default Recommend