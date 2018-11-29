/** @flow */
import React, {Component} from "react"
import ContentCurrent from "./ContentCurrent"
import {View} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Button from "../../../common/components/Button"
import style from "../styles/Main/Main"
import FutureChoice, {ModalFutureChoice} from "../../components/FutureChoice"
import {COLOR_WHITE} from "../../../../Style"
import ContentPast from "./ContentPast"
import ContentFuture from "./ContentFuture"


class Main extends Component<any, any> {

  state = {
    modalVisible: false,
    modalChoice: ModalFutureChoice.CURRENT,
    modalPageY: 0,
  }

  ref

  headerTitle = (visible: boolean, title: string) => {
    return (
      <View style={style.headerTitle}>
        <Button text={title} hitSlop={{right: 20}} onPress={() => this.setState({modalVisible: true})}/>
        <AntDesign name={visible ? 'caretup' : 'caretdown'} size={12} color={COLOR_WHITE}/>
      </View>
    )
  }

  static navigationOptions = ({navigation}) => {
    const {headerTitle, headerLeft, headerRight} = navigation.state.params || {}
    return {
      headerLeft: headerLeft,
      headerTitle: headerTitle,
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      headerTitle: this.headerTitle(this.state.modalVisible, this.state.modalChoice),
    })
  }

  componentDidMount() {
    setTimeout(() => this.ref.measure((frameX, frameY, width, height, pageX, pageY) => this.setState({modalPageY: pageY})), 1)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modalVisible !== nextState.modalVisible) {
      this.props.navigation.setParams({headerTitle: this.headerTitle(nextState.modalVisible, nextState.modalChoice)})
    }
    return true
  }

  onModalChoice = (choice: string) => {
    this.setState({modalVisible: false, modalChoice: choice})
  }

  render() {
    const {modalVisible, modalChoice, modalPageY} = this.state
    return (
      <View ref={ref => this.ref = ref} style={style.outline}>
        <FutureChoice modalPageY={modalPageY} modalVisible={modalVisible}
                      modalChoice={modalChoice} onModalChoice={this.onModalChoice}/>

        {modalChoice === ModalFutureChoice.CURRENT && <ContentCurrent {...this.props}/>}
        {modalChoice === ModalFutureChoice.PAST && <ContentPast {...this.props}/>}
        {modalChoice === ModalFutureChoice.FUTURE && <ContentFuture {...this.props}/>}
      </View>
    )
  }
}

export default Main