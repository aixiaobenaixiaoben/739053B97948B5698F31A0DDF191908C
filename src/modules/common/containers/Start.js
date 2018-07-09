/** @flow */
import React, {Component} from "react"
import {Image, ImageBackground, View} from "react-native"
import {NavigationActions, StackActions} from 'react-navigation'
import {connect} from "react-redux"
import PropTypes from "prop-types"

import Button from "../components/Button"
import style from "./styles/Start"
import * as actions from "../actions/Guide"


class Start extends Component<any, any> {

  timer: any

  constructor(props) {
    super(props)
    this.state = {
      count: 3,
    }
  }

  componentDidMount() {
    this.checkGuideReset()

    this.timer = setInterval(() => {
      const count = this.state.count - 1
      this.setState({count})
      if (count === -1) {
        this.goHome()
      }
    }, 1000)
  }

  checkGuideReset = () => {
    //TODO
    // this.props.resetGuide()
  }

  goHome = () => {
    clearInterval(this.timer)
    let nextRoute = 'RootTab'
    if (!this.props.guideRead) {
      nextRoute = 'guide'
      this.props.readGuide()
    }
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: nextRoute })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { count } = this.state
    return (
      <View style={style.view}>
        <ImageBackground source = {require('../../../../assets/4.png')} style = {style.imageBack}>
          <Button style={style.button} text={`${count} | 跳过`} onPress={this.goHome}/>
        </ImageBackground>

        <View style={style.bottom}>
          <Image source = {require('../../../../assets/5.png')} style = {style.bottomImage}/>
        </View>
      </View>
    )
  }
}

Start.propTypes = {
  guideRead: PropTypes.bool.isRequired,
  readGuide: PropTypes.func.isRequired,
  resetGuide: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    guideRead: state.common.guide.guideRead,
  }),
  dispatch => ({
    readGuide: () => dispatch(actions.guideRead()),
    resetGuide: () => dispatch(actions.guideReset()),
  })
)(Start);