/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {List, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import * as actions from "../../actions/Profile/Profile"
import style from "../styles/Profile/Gender"
import Button from "../../../common/components/Button"
import type {Syprofil} from "../../interface/Syprofil"
import AntDesign from "react-native-vector-icons/AntDesign"
import {COLOR_SYS} from "../../../../Style"

const Item = List.Item

class Gender extends Component<any, any> {

  state = {
    gender: '',
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
    this.setState({gender: this.props.profile.spfgender})
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.profile.spfverson !== this.props.profile.spfverson) {
      this.props.navigation.pop()
      return false
    }
    return true
  }

  submit = () => {
    let {profile} = this.props
    let param: Syprofil = {
      spfseqcod: profile.spfseqcod,
      spfverson: profile.spfverson,
      spfgender: this.state.gender,
    }
    this.props.updateProfile(param)
  }

  getExtra = (gender: string) => {
    return this.state.gender === gender ? <AntDesign name='check' size={20} color={COLOR_SYS}/> : null
  }

  render() {
    return (
      <ScrollView style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} onClick={() => this.setState({gender: 'M'})} extra={this.getExtra('M')}>
            男
          </Item>
          <Item style={style.listItem} onClick={() => this.setState({gender: 'F'})} extra={this.getExtra('F')}>
            女
          </Item>
        </List>
      </ScrollView>
    )
  }
}

Gender.propTypes = {
  profile: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    profile: state.my.profile.profile,
  }),
  dispatch => ({
    updateProfile: (data: Syprofil) => dispatch(actions.updateProfile(data)),
  })
)(Gender)
