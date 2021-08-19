import React from 'react'
import PropTypes from 'prop-types'

class ScreenView extends React.Component {
  render () {
    return(
      <div>
        <h1>ScreenView</h1>
        <p onClick={this.props.start}>click</p>
      </div>
    )
  }
}

export default ScreenView;
