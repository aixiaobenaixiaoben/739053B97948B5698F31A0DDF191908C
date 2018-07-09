/** @flow */
import React, {Component} from "react"
import {Platform, ProgressBarAndroid, ProgressViewIOS} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import * as actions from "../actions/Progress"


class Progress extends Component<any, any> {

  timer;

  componentDidMount(){
    const { progressing } = this.props;
    this.timer = setInterval(() => progressing(), 10);
  }

  componentWillUnmount() {
    this.props.progressDestroy();
    clearInterval(this.timer);
  }

  render() {
    const { progress } = this.props;
    if (progress >= 0.95) {
      clearInterval(this.timer);
    }

    return Platform.OS === 'ios'
      ? <ProgressViewIOS progress = {progress}/>
      : <ProgressBarAndroid styleAttr="Horizontal"/>;
  }
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  progressing: PropTypes.func.isRequired,
  progressDestroy: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    progress: state.app.progress.progress,
  }),
  dispatch => ({
    progressing: () => dispatch(actions.progressing()),
    progressDestroy: () => dispatch(actions.progressDestroy()),
  })
)(Progress);
