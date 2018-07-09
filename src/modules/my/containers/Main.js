/** @flow */
import React, {Component} from "react"
import {Button, Text, View} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../common/actions/Login/Login"


class Main extends Component<any, any> {

  logout = () => {
    this.props.logout()
  }

  jump = () => {
    const route = this.props.loginID === undefined || this.props.loginID.length === 0 ? 'MyLogin' : 'MyLoginOption'
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    if (!this.props.isLogin) {
      this.jump()
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is My Main Page</Text>
        <Button title='Go To Detail' onPress={() => this.props.navigation.navigate('MyDetail')} />
        <Button title='退出登录' onPress={this.logout} />
      </View>
    );
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  loginID: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    loginID: state.common.login.loginID,
  }),
  dispatch => ({
    logout: () => dispatch(actions.logout()),
  })
)(Main)