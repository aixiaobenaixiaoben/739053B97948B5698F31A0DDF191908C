/** @flow */
import React, {Component} from "react"
import {Text} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/Main/Content"
import Button from "../../../common/components/Button"


class Content extends Component<any, any> {

  headerRight = (isLogin: boolean) => {
    return isLogin ? <Button style={style.headerButton} text='新建' onPress={this.addMemory}/> : null
  }

  componentWillMount() {
    this.props.navigation.setParams({
      headerRight: this.headerRight(this.props.isLogin),
    })
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.isLogin !== nextProps.isLogin) {
      this.props.navigation.setParams({headerRight: this.headerRight(nextProps.isLogin)})
    }
    return true
  }

  addMemory = () => {
    this.props.navigation.navigate('MemoryCreate')
  }

  render() {
    return (
      <Text>memory</Text>
    )
  }
}

Content.propTypes = {
  isLogin: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
  })
)(Content)