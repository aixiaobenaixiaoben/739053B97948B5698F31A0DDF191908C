/** @flow */
import React, {Component} from "react"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import * as ftpActions from "../../../common/actions/FTP"
import * as aboutActions from "../../actions/About/About"
import * as profileActions from "../../actions/Profile/Profile"
import {ACTION_PROFILE_PATH_CLEAR} from "../../Constants"
import type {Syusrinf} from "../../../common/interface/Syusrinf"
import Content from "./Content"


class Main extends Component<any, any> {

  componentWillMount() {
    if (this.props.photoPath.length > 0) {
      this.props.cacheSync(ACTION_PROFILE_PATH_CLEAR, this.props.photoPath)
    }
    if (!this.props.isLogin) {
      this.jumpToLogin()
    } else {
      this.props.requestProfile({suiseqcod: this.props.user.suiseqcod})
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.isLogin) {
      if (this.props.navigation.isFocused()) {
        this.jumpToLogin()
      } else {
        this.props.navigation.navigate('RootTab')
      }
    }
    return true
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', this.willFocus),
    ]
    if (this.props.isLogin) {
      this.props.requestVersion()
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove())
  }

  willFocus = (payload) => {
    if (!this.props.isLogin && payload.action.type === 'Navigation/NAVIGATE') {
      this.jumpToLogin()
    }
  }

  jumpToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'MyLogin'})],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return <Content {...this.props}/>
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  photoPath: PropTypes.string.isRequired,
  requestProfile: PropTypes.func.isRequired,
  cacheSync: PropTypes.func.isRequired,
  requestVersion: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    photoPath: state.my.profile.photoPath,
  }),
  dispatch => ({
    requestProfile: (data: Syusrinf) => dispatch(profileActions.profile(data)),
    cacheSync: (action: string, fileName: string) => dispatch(ftpActions.cacheSync(action, fileName)),
    requestVersion: () => dispatch(aboutActions.requestVersion()),
  })
)(Main)