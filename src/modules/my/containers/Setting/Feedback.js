/** @flow */
import React, {Component} from "react"
import {ScrollView, Text, View} from "react-native"
import PropTypes from "prop-types"
import style from "../styles/Setting/Feedback"
import {ImagePicker, Modal, TextareaItem, WhiteSpace} from "antd-mobile-rn"
import Button from "../../../common/components/Button"
import {connect} from "react-redux"
import * as actions from "../../actions/Setting/Feedback"
import type {Syfedbak} from "../../interface/Syfedbak"
import {ACTION_FEEDBACK_UPDATE} from "../../Constants"
import * as ftpActions from "../../../common/actions/FTP"


class Feedback extends Component<any, any> {

  state = {
    a: '',
    files: [],
  }

  componentDidMount() {
    this.props.feedbackReset()
  }

  shouldComponentUpdate(nextProps) {
    const {isFeedbackSuc, photoRemoteID} = nextProps
    const {a, files} = this.state
    if (photoRemoteID !== this.props.photoRemoteID && photoRemoteID.length > 0
      && photoRemoteID.split(',').length === files.length) {

      let param: Syfedbak = {
        sfbusrseq: this.props.user.suiseqcod,
        sfbcommnt: a,
        sfbphotos: photoRemoteID,
      }
      this.props.feedback(param)
    }
    if (isFeedbackSuc) {
      Modal.alert('反馈成功', '感谢您的反馈！', [{text: '确定', onPress: this.success}])
    }
    return true
  }

  success = () => {
    this.props.feedbackReset()
    this.props.navigation.pop()
  }

  submit = () => {
    const {a, files} = this.state
    if (files.length === 0) {
      let param: Syfedbak = {
        sfbusrseq: this.props.user.suiseqcod,
        sfbcommnt: a,
        sfbphotos: '',
      }
      this.props.feedback(param)
      return
    }
    for (let file of files) {
      this.props.upload(ACTION_FEEDBACK_UPDATE, file.url)
    }
  }

  render() {
    const {a, files} = this.state
    let canSubmit = a.trim().length > 0 || files.length > 0
    let selectable = files.length !== 3

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>

        <WhiteSpace size="lg"/>
        <View style={style.view}>
          <TextareaItem rows={5} count={100} autoCapitalize='none'
                        placeholder="请写下您的建议，如功能需求、产品吐槽等，我们会努力改进"
                        onChange={(a) => this.setState({a})}/>

          <Text style={style.text}>可加3张图</Text>
          <ImagePicker selectable={selectable} files={files} onChange={(files) => this.setState({files})}/>
        </View>

        <Button text='提交' style={style.button} disabled={!canSubmit} onPress={this.submit}/>

      </ScrollView>
    )
  }
}

Feedback.propTypes = {
  user: PropTypes.object.isRequired,
  isFeedbackSuc: PropTypes.bool.isRequired,
  photoRemoteID: PropTypes.string.isRequired,
  feedback: PropTypes.func.isRequired,
  feedbackReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
    isFeedbackSuc: state.my.feedback.isFeedbackSuc,
    photoRemoteID: state.my.feedback.photoRemoteID,
  }),
  dispatch => ({
    feedback: (data: Syfedbak) => dispatch(actions.feedback(data)),
    feedbackReset: () => dispatch(actions.feedbackReset()),
    upload: (action: string, path: string) => dispatch(ftpActions.upload(action, path)),
  })
)(Feedback)