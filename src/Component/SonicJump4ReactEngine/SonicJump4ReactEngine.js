import React from 'react'
import PropTypes from 'prop-types'
import ScreenView from './ScreenView/ScreenView'
import GameView from './GameView/GameView'

class SonicJump4ReactEngine extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      running: false
    }
  }
  toggleRun = () =>{
    this.setState({running: !this.state.running})
  }
  render () {
    return(
      <div className="SonicJump_Screen">
        {this.state.running ? <GameView run={this.toggleRun} /> : <ScreenView start={this.toggleRun} />}
      </div>
    )
  }
}

export default SonicJump4ReactEngine;
