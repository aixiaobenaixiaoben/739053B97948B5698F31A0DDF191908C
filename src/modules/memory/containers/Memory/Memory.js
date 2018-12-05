/** @flow */
import React, {Component} from "react"
import {ScrollView, Text, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Modal} from "antd-mobile-rn"
import style from "../styles/Memory/Memory"
import * as DateUtils from "../../../common/utils/DateUtils"
import Button from "../../../common/components/Button"
import * as memoryActions from "../../actions/Memory"
import type {Mememory} from "../../interface/Mememory"


class Memory extends Component<any, any> {

  state = {
    memory: this.props.navigation.getParam('memory'),
  }

  headerRight = () => {
    return <Button style={style.headerButton} text='编辑' onPress={this.modMemory}/>
  }

  static navigationOptions = ({navigation}) => {
    const {headerRight} = navigation.state.params || {}
    return {
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      headerRight: this.headerRight(),
    })
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.updateMemory !== nextProps.updateMemory) {
      if (nextProps.updateMemory.mmrseqcod) {
        this.setState({memory: nextProps.updateMemory})
      } else {
        this.props.navigation.pop()
      }
    }
    return true
  }

  modMemory = () => {
    this.props.navigation.navigate('MemoryMemoryMod', {memory: this.state.memory})
  }

  remove = () => {
    Modal.alert('确认', '确定删除回忆?', [
      {text: '取消'},
      {text: '确定', onPress: () => this.props.memoryDel({mmrseqcod: this.state.memory.mmrseqcod})},
    ])
  }

  dateString = (dateString: string): string => {
    let date = new Date(dateString)
    return DateUtils.transDateString(DateUtils.localDateString(dateString)) + ' ' + DateUtils.WEEK(date.getDay())
  }

  render() {
    const memory: Mememory = this.state.memory
    const {mmrmtitle, mmrcontnt, mmroccdat, mmrnewtim, mmrverson} = memory

    return (
      <View style={style.outline}>

        <ScrollView>
          <View style={style.view}>
            <Text style={style.title}>{mmrmtitle}</Text>
            <Text style={style.date}>归档日期:{this.dateString(mmroccdat)}</Text>
            <Text style={style.date}>创建日期:{mmrnewtim}</Text>
            <Text style={style.date}>修改日期:{mmrverson}</Text>
          </View>
          <View style={style.view}>
            <Text style={style.mark}>备注</Text>
            <Text style={style.note}>{mmrcontnt}</Text>
          </View>
        </ScrollView>

        <Button text='删除回忆' onPress={this.remove} style={style.button}/>
      </View>
    )
  }
}

Memory.propTypes = {
  updateMemory: PropTypes.object.isRequired,
  memoryDel: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    updateMemory: state.memory.memory.updateMemory,
  }),
  dispatch => ({
    memoryDel: (data: Mememory) => dispatch(memoryActions.del(data)),
  })
)(Memory)