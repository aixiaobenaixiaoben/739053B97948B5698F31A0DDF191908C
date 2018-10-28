/** @flow */
import React, {Component} from "react"
import {Image, ScrollView} from "react-native"
import {List, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/Profile/Profile"
import {ACTION_PROFILE_PATH_UPDATE} from "../../Constants"
import * as ftpActions from "../../../common/actions/FTP"

const Item = List.Item

class Profile extends Component<any, any> {

  modifyPhoto = () => {
    alert(1)
  }

  modifyName = () => {
    alert(1)
  }

  modifyGender = () => {
    alert(1)
  }

  getPhoto = () => {
    const {profile: {spfphotog = ''}, photoPath} = this.props
    if (spfphotog != null && spfphotog.length > 0 && photoPath.indexOf(spfphotog) === -1) {
      this.props.download(ACTION_PROFILE_PATH_UPDATE, spfphotog)
    }
    if (photoPath.length > 0) {
      return <Image style={style.image} source={{uri: photoPath}}/>
    }
    return <Image style={style.image} source={require('../../../../../assets/my/profile/logo01.png')}/>
  }

  render() {
    let {user: {suiusrnam}} = this.props

    return (
      <ScrollView style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} arrow="horizontal" onClick={this.modifyPhoto} extra={this.getPhoto()}>
            头像
          </Item>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} arrow="horizontal" onClick={this.modifyName} extra={suiusrnam}>
            昵称
          </Item>
          <Item style={style.listItem} arrow="horizontal" onClick={this.modifyGender} extra={suiusrnam}>
            性别
          </Item>
        </List>
      </ScrollView>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  photoPath: PropTypes.string.isRequired,
  download: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
    profile: state.my.profile.profile,
    photoPath: state.my.profile.photoPath,
  }),
  dispatch => ({
    download: (action: string, fileName: string) => dispatch(ftpActions.download(action, fileName)),
  })
)(Profile)
