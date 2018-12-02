/** @flow */
import React, {Component} from "react"
import ContentCurrent from "./ContentCurrent"
import {Text, View} from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import {connect} from "react-redux"
import PropTypes from "prop-types"
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

  goLogin = () => {
    this.props.navigation.navigate('MyTab')
  }

  render() {
    const {modalVisible, modalChoice, modalPageY} = this.state
    const {isLogin} = this.props
    return (
      <View ref={ref => this.ref = ref} style={style.outline}>
        <FutureChoice modalPageY={modalPageY} modalVisible={modalVisible}
                      modalChoice={modalChoice} onModalChoice={this.onModalChoice}/>

        {modalChoice === ModalFutureChoice.CURRENT && <ContentCurrent {...this.props}/>}
        {modalChoice === ModalFutureChoice.PAST && <ContentPast {...this.props}/>}
        {modalChoice === ModalFutureChoice.FUTURE && <ContentFuture {...this.props}/>}

        {!isLogin &&
        <View style={style.tail}>
          <Text style={style.tailText}>登录后查看自己的日程</Text>
          <Button text='登录' onPress={this.goLogin} style={style.tailButton} textStyle={style.tailButtonText}/>
        </View>
        }
      </View>
    )
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
  })
)(Main)
