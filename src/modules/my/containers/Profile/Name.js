/** @flow */
import React, {Component} from "react"
import {ScrollView, Text} from "react-native"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import * as actions from "../../actions/Profile/Name"
import style from "../styles/Profile/Name"
import type {Syusrinf} from "../../../common/interface/Syusrinf"
import Button from "../../../common/components/Button"


class Name extends Component<any, any> {

  state = {
    username: '',
  }

  static navigationOptions = ({navigation}) => {
    const saveFunc = navigation.getParam('saveFunc', () => {
    })
    let headerRight = <Button text='保存' onPress={saveFunc} style={style.button}/>
    return {
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({saveFunc: this.submit})
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.user.suiverson !== this.props.user.suiverson) {
      this.props.navigation.pop()
      return false
    }
    return true
  }

  submit = () => {
    const {username} = this.state
    const regName = /^[\u4E00-\u9FA5A-Za-z0-9]{1,16}$/
    if (!regName.test(username)) {
      Modal.alert('', '昵称格式不正确')
      return
    }
    this.props.usernameModify({suiusrnam: username})
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} maxLength={16} clear placeholder="请输入昵称" autoCapitalize='none'
                     onChange={(username) => this.setState({username})}>
          </InputItem>
        </List>

        <Text style={style.comment}>
          温馨提示：{'\n\n'}昵称支持1-16位中文、数字、字母(区分大小写)的组合
        </Text>
      </ScrollView>
    )
  }
}

Name.propTypes = {
  user: PropTypes.object.isRequired,
  usernameModify: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
  }),
  dispatch => ({
    usernameModify: (data: Syusrinf) => dispatch(actions.usernameModify(data)),
  })
)(Name)
