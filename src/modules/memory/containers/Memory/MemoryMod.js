/** @flow */
import React, {Component} from "react"
import {ScrollView, View} from "react-native"
import {DatePicker, InputItem, List, TextareaItem, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/Memory/MemoryMod"
import * as DateUtils from "../../../common/utils/DateUtils"
import Button from "../../../common/components/Button"
import type {Mememory} from "../../interface/Mememory"
import * as memoryActions from "../../actions/Memory"

let MINDATE = new Date(1970, 0, 1)
const current = new Date()
let MAXDATE = new Date(current.getFullYear(), current.getMonth(), current.getDate())

class MemoryMod extends Component<any, any> {

  state = {
    a: '',
    b: undefined,
    c: '',
  }

  headerRight = (canSubmit: boolean = false) => {
    return <Button style={style.headerButton} text='保存' onPress={this.save} disabled={!canSubmit}/>
  }

  static navigationOptions = ({navigation}) => {
    const {headerRight} = navigation.state.params || {}
    return {
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({headerRight: this.headerRight()})
  }

  componentDidMount() {
    let memory: Mememory = this.props.navigation.getParam('memory')
    const {mmrmtitle, mmroccdat, mmrcontnt} = memory
    this.setState({
      a: mmrmtitle,
      b: new Date(mmroccdat),
      c: mmrcontnt,
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      const {a, b} = nextState
      const canSubmit = a.trim().length > 0 && b
      this.props.navigation.setParams({headerRight: this.headerRight(canSubmit)})
    }
    if (this.props.updateMemory !== nextProps.updateMemory) {
      this.props.navigation.pop()
    }
    return true
  }

  save = () => {
    const {a, b, c} = this.state
    let memory: Mememory = this.props.navigation.getParam('memory')
    const mememory: Mememory = {
      ...memory,
      mmrmtitle: a,
      mmrcontnt: c,
      mmroccdat: b.toJSON(),
    }
    this.props.memoryMod(mememory)
  }

  format = (value: Date) => {
    return DateUtils.transDateString(DateUtils.localDateString(value.toJSON()))
  }

  render() {
    let memory: Mememory = this.props.navigation.getParam('memory')
    const {mmrmtitle, mmrcontnt} = memory

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} maxLength={32} clear placeholder="标题" autoCapitalize='none'
                     defaultValue={mmrmtitle} onChange={a => this.setState({a})}>
          </InputItem>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <DatePicker mode="date" minDate={MINDATE} maxDate={MAXDATE} format={this.format}
                      value={this.state.b} onChange={b => this.setState({b})}>
            <List.Item style={style.listItem}>归档日期</List.Item>
          </DatePicker>
        </List>

        <WhiteSpace size="lg"/>
        <View style={style.textArea}>
          <TextareaItem rows={28} count={512} autoCapitalize='none' placeholder="正文"
                        defaultValue={mmrcontnt} onChange={c => this.setState({c})}/>
        </View>
      </ScrollView>
    )
  }
}

MemoryMod.propTypes = {
  updateMemory: PropTypes.object.isRequired,
  memoryMod: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    updateMemory: state.memory.memory.updateMemory,
  }),
  dispatch => ({
    memoryMod: (data: Mememory) => dispatch(memoryActions.mod(data)),
  })
)(MemoryMod)