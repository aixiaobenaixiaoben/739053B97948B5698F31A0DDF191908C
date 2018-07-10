/** @flow */
import React, {Component} from "react"
import {Button, Text, View} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../../common/actions/Login/Login"


class Main extends Component<any, any> {

  componentWillMount() {
    if (!this.props.isLogin) {
      this.jump(this.props)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.isLogin) {
      this.jump(nextProps)
      return false
    }
    return true
  }

  logout = () => {
    this.props.logout()
  }

  jump = (props) => {
    const route = props.loginID === undefined || props.loginID.length === 0 ? 'MyLogin' : 'MyLoginOption'
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { mobile, password } = this.props
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is My Main Page</Text>
        <Text>Mobile: {mobile}</Text>
        <Text>Password: {password}</Text>
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
    mobile: state.common.login.mobile,
    password: state.common.login.password,
  }),
  dispatch => ({
    logout: () => dispatch(actions.logout()),
  })
)(Main)