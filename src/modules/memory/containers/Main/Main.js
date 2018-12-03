/** @flow */
import React, {Component} from "react"
import {AppState} from "react-native"
import TouchId from "react-native-touch-id"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import RNCalendarEvents from "react-native-calendar-events"

import * as touchIDActions from "../../../common/actions/Login/LoginTouchID"
import * as loginActions from "../../../common/actions/Login/Login"
import * as autoLoginActions from "../../../my/actions/Setting/AutoLogin"
import * as aboutActions from "../../../my/actions/About/About"
import * as calendarActions from "../../../future/actions/Calendar"
import type {Syusrinf} from "../../../common/interface/Syusrinf"
import {DURATION_AUTO_LOGIN} from "../../../common/Constants"
import Content from "./Content"


class Main extends Component<any, any> {

  state = {
    appState: AppState.currentState
  }

  static navigationOptions = ({navigation}) => {
    const {headerRight} = navigation.state.params || {}
    return {
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    if (this.props.isLogin) {
      this.props.autoLogin ? this.props.login(this.props.user) : this.props.logout()
    }
    TouchId.isSupported().then(biometryType => {
      if (!this.props.isTouchIDSupported) {
        this.props.touchIDSupported(biometryType)
      }
    })
    RNCalendarEvents.authorizeEventStore().then(response => {
      const accessible = response === 'authorized'
      if (this.props.calendarAccessible !== accessible) {
        this.props.calendarAccess(accessible)
      }
    })
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.props.requestVersion()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      /** become background */
      if (this.props.isLogin) {
        /** remember the exit time */
        this.props.autoLoginStub(Date.now())
      }
    }
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      /** become foreground */
      if (this.props.isLogin) {
        /** compare timestamp between now and the stub exit time */
        if (Date.now() - this.props.exitTime >= DURATION_AUTO_LOGIN) {
          this.props.autoLogin ? this.props.login(this.props.user) : this.props.logout()
        }
      }
    }
    this.setState({appState: nextAppState})
  }

  render() {
    return <Content {...this.props}/>
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  autoLogin: PropTypes.bool.isRequired,
  exitTime: PropTypes.number.isRequired,
  isTouchIDSupported: PropTypes.bool.isRequired,
  calendarAccessible: PropTypes.bool.isRequired,
  touchIDSupported: PropTypes.func.isRequired,
  requestVersion: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  autoLoginStub: PropTypes.func.isRequired,
  calendarAccess: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    autoLogin: state.my.autoLogin.autoLogin,
    exitTime: state.my.autoLogin.exitTime,
    isTouchIDSupported: state.common.loginTouchID.isTouchIDSupported,
    calendarAccessible: state.future.calendar.accessible,
  }),
  dispatch => ({
    touchIDSupported: (touchIDType) => dispatch(touchIDActions.touchIDSupported(touchIDType)),
    requestVersion: () => dispatch(aboutActions.requestVersion()),
    login: (data: Syusrinf) => dispatch(loginActions.login(data)),
    logout: () => dispatch(loginActions.logout()),
    autoLoginStub: (time: number) => dispatch(autoLoginActions.autoLoginStub(time)),
    calendarAccess: (accessible: boolean) => dispatch(calendarActions.access(accessible)),
  })
)(Main)