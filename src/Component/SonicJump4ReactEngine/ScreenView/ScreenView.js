import React from 'react'
import PropTypes from 'prop-types'
import './ScreenView.css'

class ScreenView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      animate_transition : false
    }
  }
  start_launch = () => {
    this.setState({animate_transition: !this.state.animate_transition})
    setTimeout(()=>{
      this.props.start()
    },1000)
  }
  render () {

    return(
      <div className="ScreenView">
        <h1>SonicJump v.0.5</h1>
        <div className="ScreenBoard">
          <div className="ScoreBoard">
            <div className="LatestScore">
              <h2>Your Score :</h2>
              <p>0</p>
            </div>
            <div className="BestScore">
              <h2>Best Score :</h2>
              <p>0</p>
            </div>
          </div>
          <div className="StartPanel">
            <p className="ButtonStart" onClick={this.start_launch}>Start</p>
          </div>
          <div className="LeaderBoard">
            <h2>LeaderBoard</h2>
          </div>
        </div>
        <div className={`AnimateTransition ${this.state.animate_transition ? "" : "hidden"}`}></div>
      </div>
    )
  }
}

export default ScreenView;
