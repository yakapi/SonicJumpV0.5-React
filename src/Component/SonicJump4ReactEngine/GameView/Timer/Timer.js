import React from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter/Counter'
import './Timer.css'

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      unmount : true
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({unmount: false})
    },this.props.time + 700)
  }
  render () {
    return(
      <div>
        {this.state.unmount ? <Counter timeCount={this.props.time}/> : ""}
      </div>
    )
  }
}

export default Timer;
