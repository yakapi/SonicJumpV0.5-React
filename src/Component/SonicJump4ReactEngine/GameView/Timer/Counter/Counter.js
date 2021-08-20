import React from 'react'
import PropTypes from 'prop-types'

class Counter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text : 'Ready'
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({text: 'GO'})
    },this.props.timeCount)
  }
  render () {
    return(
      <div className="Timer">
        <p>{this.state.text}</p>
      </div>
    )
  }
}

export default Counter;
