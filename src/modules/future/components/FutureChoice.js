/** @flow */
import React, {Component} from "react"
import {Modal, PanResponder, View} from "react-native"
import {List} from "antd-mobile-rn"
import AntDesign from "react-native-vector-icons/AntDesign"
import PropTypes from "prop-types"
import style from "./styles/FutureChoice"
import {COLOR_SYS} from "../../../Style"

export const ModalFutureChoice = {
  CURRENT: '日程',
  PAST: '过往日程',
  FUTURE: '未来日程',
}

class FutureChoice extends Component<any, any> {

  panResponder: {}

  constructor(props: any) {
    super(props)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: () => this.props.onModalChoice(this.props.modalChoice),
    })
  }

  getExtra = (choice: string) => {
    return this.props.modalChoice === choice ? <AntDesign name='check' size={20} color={COLOR_SYS}/> : null
  }

  render() {
    const {CURRENT, PAST, FUTURE} = ModalFutureChoice
    const {modalPageY} = this.props
    return (
      <Modal visible={this.props.modalVisible} transparent={true} animationType="fade">

        <View {...this.panResponder.panHandlers} style={[style.modalView, {paddingTop: modalPageY}]}>

          <List style={style.modalList}>
            <List.Item onClick={() => this.props.onModalChoice(CURRENT)} extra={this.getExtra(CURRENT)}>
              {CURRENT}
            </List.Item>
            <List.Item onClick={() => this.props.onModalChoice(PAST)} extra={this.getExtra(PAST)}>
              {PAST}
            </List.Item>
            <List.Item onClick={() => this.props.onModalChoice(FUTURE)} extra={this.getExtra(FUTURE)}>
              {FUTURE}
            </List.Item>
          </List>
        </View>
      </Modal>
    )
  }
}

FutureChoice.propTypes = {
  modalPageY: PropTypes.number.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  modalChoice: PropTypes.string.isRequired,
  onModalChoice: PropTypes.func.isRequired,
}

export default FutureChoice