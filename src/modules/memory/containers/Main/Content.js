/** @flow */
import React, {Component} from "react"
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {ActivityIndicator, SwipeAction} from "antd-mobile-rn"
import style from "../styles/Main/Content"
import Button from "../../../common/components/Button"
import * as memoryActions from "../../actions/Memory"
import type {Mememory} from "../../interface/Mememory"
import {COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE} from "../../../../Style"
import * as DateUtils from "../../../common/utils/DateUtils"


class Content extends Component<any, any> {

  state = {
    memories: [],
    moreLoading: false,
  }

  pageIndex = 0
  pageSize = 12
  ref
  scrollViewHeight: number

  headerRight = (isLogin: boolean) => {
    return isLogin ? <Button style={style.headerButton} text='新建' onPress={this.addMemory}/> : null
  }

  componentWillMount() {
    this.props.navigation.setParams({
      headerRight: this.headerRight(this.props.isLogin),
    })
  }

  componentDidMount() {
    this.refreshMemory(this.props.isLogin)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.headerHeight === 0 && nextProps.headerHeight > 0) {
      this.scrollViewHeight += nextProps.headerHeight
    }
    if (this.props.memories !== nextProps.memories) {
      this.setState({moreLoading: false, memories: this.state.memories.concat(nextProps.memories)})
    }
    if (this.props.updateMemory !== nextProps.updateMemory) {
      this.refreshMemory(this.props.isLogin)
    }
    if (this.props.isLogin !== nextProps.isLogin) {
      this.props.navigation.setParams({headerRight: this.headerRight(nextProps.isLogin)})
      this.refreshMemory(nextProps.isLogin)
    }
    return true
  }

  requestMemory = () => {
    const memory: Mememory = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    }
    this.props.memoryFetch(memory)
  }

  refreshMemory = (isLogin: boolean) => {
    this.pageIndex = 0
    this.setState({memories: []})
    if (isLogin) {
      this.requestMemory()
    }
  }

  addMemory = () => {
    this.props.navigation.navigate('MemoryCreate')
  }

  remove = (mmrseqcod) => {
    this.props.memoryDel({mmrseqcod})
  }

  keyExtractor = (item) => item.mmrseqcod

  renderItem = ({item}) => {
    const {mmrseqcod, mmrmtitle, mmroccdat} = item
    const date = DateUtils.localDateString(mmroccdat)
    let action = [
      {
        text: '详情',
        onPress: () => alert('detail'),
        style: {backgroundColor: COLOR_FONT_GRAY_DARK, color: COLOR_WHITE},
      },
      {
        text: '删除',
        onPress: () => this.remove(mmrseqcod),
        style: {backgroundColor: COLOR_SYS, color: COLOR_WHITE},
      }
    ]
    return (
      <SwipeAction right={action} autoClose style={{backgroundColor: 'transparent'}}>
        <TouchableOpacity style={style.listItem} onPress={() => alert('detail')} activeOpacity={0.8}>
          <Text style={style.date}>{date}</Text>
          <View style={style.fill}/>
          <Text style={style.text} numberOfLines={1}>{mmrmtitle}</Text>
        </TouchableOpacity>
      </SwipeAction>
    )
  }

  noMoreMemory = (): boolean => {
    return Math.ceil(this.props.memoryLength / this.pageSize) - 1 === this.pageIndex
  }

  onLayout = (event) => {
    this.scrollViewHeight = this.props.headerHeight + event.nativeEvent.layout.height
  }

  onScroll = () => {
    if (!this.state.moreLoading && this.ref) {
      this.ref.measure((frameX, frameY, width, height, pageX, pageY) => {
        if (pageY + height === this.scrollViewHeight) {
          if (!this.noMoreMemory()) {
            this.setState({moreLoading: true})
            this.pageIndex += 1
            this.requestMemory()
          }
        }
      })
    }
  }

  ListFooterComponent = () => {
    if (!this.props.isLogin) return null
    let text = this.noMoreMemory() ? '都加载完啦' : '上滑加载'
    const {moreLoading} = this.state
    if (moreLoading) {
      text = '加载中'
    }
    return (
      <View ref={ref => this.ref = ref} style={style.listFooter}>
        <ActivityIndicator animating={moreLoading}/>
        <Text style={style.listFooterText}>{text}</Text>
      </View>
    )
  }

  render() {
    const {memories} = this.state
    return (
      <ScrollView onLayout={this.onLayout} style={style.scroll} contentContainerStyle={style.scrollContent}>
        <FlatList
          style={style.list}
          data={memories}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListFooterComponent={this.ListFooterComponent()}
          onScroll={this.onScroll}
        />
      </ScrollView>
    )
  }
}

Content.propTypes = {
  headerHeight: PropTypes.number.isRequired,
  isLogin: PropTypes.bool.isRequired,
  memories: PropTypes.array.isRequired,
  memoryLength: PropTypes.number.isRequired,
  updateMemory: PropTypes.object.isRequired,
  memoryDel: PropTypes.func.isRequired,
  memoryFetch: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    memories: state.memory.memory.memories,
    memoryLength: state.memory.memory.memoryLength,
    updateMemory: state.memory.memory.updateMemory,
  }),
  dispatch => ({
    memoryDel: (data: Mememory) => dispatch(memoryActions.del(data)),
    memoryFetch: (data: Mememory) => dispatch(memoryActions.fetch(data)),
  })
)(Content)