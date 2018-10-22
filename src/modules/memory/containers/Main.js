/** @flow */
import React, {Component} from "react"
import {Button, Text, View} from "react-native"
import TouchId from "react-native-touch-id"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../common/actions/Login/LoginTouchID"


class Main extends Component<any, any> {

  componentWillMount() {
    TouchId.isSupported().then(biometryType => {
      if (!this.props.isTouchIDSupported) {
        this.props.touchIDSupported(biometryType)
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is Memory Main Page</Text>
        <Button
          title='Go To Detail'
          onPress={() => this.props.navigation.navigate('Memory')}
        />
      </View>
    )
  }
}

Main.propTypes = {
  isTouchIDSupported: PropTypes.bool.isRequired,
  touchIDSupported: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isTouchIDSupported: state.common.loginTouchID.isTouchIDSupported,
  }),
  dispatch => ({
    touchIDSupported: (touchIDType) => dispatch(actions.touchIDSupported(touchIDType)),
  })
)(Main)