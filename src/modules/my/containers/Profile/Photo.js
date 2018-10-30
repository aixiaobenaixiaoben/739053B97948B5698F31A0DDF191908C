/** @flow */
import React, {Component} from "react"
import {CameraRoll, Image, ScrollView} from "react-native"
import ImagePicker from 'react-native-image-crop-picker'
import style from "../styles/Profile/Photo"
import {COLOR_WHITE} from "../../../../Style"
import Button from "../../../common/components/Button"
import {connect} from "react-redux"
import * as actions from "../../actions/Profile"
import PropTypes from "prop-types"
import {Modal} from "antd-mobile-rn"
import type {Syprofil} from "../../interface/Syprofil"
import * as ftpActions from "../../../common/actions/FTP"
import {ACTION_PROFILE_PATH_UPDATE, ACTION_PROFILE_PHOTO_UPLOADED} from "../../Constants"


class Photo extends Component<any, any> {

  shouldComponentUpdate(nextProps) {
    let {profile, photoRemoteID} = this.props
    if (nextProps.photoRemoteID !== photoRemoteID) {
      let param: Syprofil = {
        spfseqcod: profile.spfseqcod,
        spfverson: profile.spfverson,
        spfphotog: nextProps.photoRemoteID,
      }
      this.props.updateProfile(param)
    }
    return true
  }

  photo = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 1,
      cropperChooseText: '完成',
      cropperCancelText: '取消',
      cropperToolbarTitle: '裁剪图片',
      smartAlbums: ['UserLibrary'],
      mediaType: 'photo',
      hideBottomControls: true,
    }).then(image => {
      const {path, mime} = image
      this.props.upload(ACTION_PROFILE_PHOTO_UPLOADED, path, mime)

    }).catch(e => {
      if (e.message === 'Cannot access images. Please allow access if you want to be able to select images.') {
        Modal.alert('', '没有权限访问手机相册,请先到手机设置中开启相册访问权限.')
      }
    })
  }

  camera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 1,
      cropperChooseText: '完成',
      cropperCancelText: '取消',
      cropperToolbarTitle: '裁剪图片',
      hideBottomControls: true,
    }).then(image => {
      const {path, mime} = image
      this.props.upload(ACTION_PROFILE_PHOTO_UPLOADED, path, mime)
      this.savePhoto(image)

    }).catch(e => {
      if (e.message === 'User did not grant camera permission.') {
        Modal.alert('', '没有权限使用相机,请先到手机设置中开启相机使用权限.')
      }
    })
  }

  savePhoto = (image: Object) => {
    CameraRoll.saveToCameraRoll(image.path, 'photo')
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
    return (
      <ScrollView style={style.scroll}>
        {this.getPhoto()}

        <Button text='从相册选一张' onPress={this.photo}
                style={style.button} textStyle={style.buttonText}
                colorStart={COLOR_WHITE} colorEnd={COLOR_WHITE}/>

        <Button text='拍一张照片' onPress={this.camera}
                style={style.button} textStyle={style.buttonText}
                colorStart={COLOR_WHITE} colorEnd={COLOR_WHITE}/>

      </ScrollView>
    )
  }
}

Photo.propTypes = {
  profile: PropTypes.object.isRequired,
  photoPath: PropTypes.string.isRequired,
  photoRemoteID: PropTypes.string.isRequired,
  updateProfile: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    profile: state.my.profile.profile,
    photoPath: state.my.profile.photoPath,
    photoRemoteID: state.my.profile.photoRemoteID,
  }),
  dispatch => ({
    updateProfile: (data: Syprofil) => dispatch(actions.updateProfile(data)),
    upload: (action: string, path: string, MIMEType: string) => dispatch(ftpActions.upload(action, path, MIMEType)),
    download: (action: string, fileName: string) => dispatch(ftpActions.download(action, fileName)),
  })
)(Photo)
