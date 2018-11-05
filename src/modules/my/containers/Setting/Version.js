/** @flow */
import React, {Component, Fragment} from "react"
import {Image, ScrollView, Text, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/Setting/Version"
import * as actions from "../../actions/Setting/Version"
import {APP_VERSION} from "../../../common/Constants"
import Button from "../../../common/components/Button"


class Version extends Component<any, any> {

  render() {
    const {appName, newVersion, url, updateDescription} = this.props.version
    const isUpdate = actions.isVersionIncrease(APP_VERSION, newVersion)

    return (
      <ScrollView style={style.scroll}>

        <View style={style.view1}>
          <Image style={style.image} source={require('../../../../../assets/my/profile/logo01.png')}/>
        </View>
        <Text style={style.versionText}>{appName} {APP_VERSION}</Text>

        {!isUpdate && <Text style={style.updateText}>新版本：当前已是最新版本</Text>}

        {isUpdate &&
        <Fragment>
          <Text style={style.updateText}>
            {`新版本：${newVersion}\n\n更新说明：\n`}
            {updateDescription.split('。').join('\n')}
          </Text>
          < Button text='更新' style={style.button} onPress={() => actions.updateFunc(url)}/>
        </Fragment>
        }

      </ScrollView>
    )
  }
}

Version.propTypes = {
  version: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    version: state.my.version.version,
  })
)(Version)