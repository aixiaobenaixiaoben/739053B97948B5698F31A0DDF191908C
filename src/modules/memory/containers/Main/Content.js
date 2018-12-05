/** @flow */
import React, {Component} from "react"
import {FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, Vibration, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {ActivityIndicator, SwipeAction} from "antd-mobile-rn"
import Sound from "react-native-sound"
import style from "../styles/Main/Content"
import Button from "../../../common/components/Button"
import * as memoryActions from "../../actions/Memory"
import type {Mememory} from "../../interface/Mememory"
import {COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE} from "../../../../Style"
import * as DateUtils from "../../../common/utils/DateUtils"


class Content extends Component<any, any> {

  state = {
    refreshing: false,
    refreshTitle: '',
    memories: [],
    moreLoading: false,
  }

  pageIndex = 0
  pageSize = 12
  ref
  scrollViewHeight: number
  scrollView
  flatList

  headerRight = (isLogin: boolean) => {
    return isLogin ? <Button style={style.headerButton} text='新建' onPress={this.addMemory}/> : null
  }

  componentWillMount() {
    this.props.navigation.setParams({
      headerRight: this.headerRight(this.props.isLogin),
    })
  }

  componentDidMount() {
    if (this.props.isLogin) {
      this.requestMemory()
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.isLogin && this.props.version !== nextProps.version) {
      this.flatList.scrollToOffset({offset: 0})
      this.scrollView.scrollTo({x: 0, y: -1, animated: true})
    }
    if (this.props.headerHeight === 0 && nextProps.headerHeight > 0) {
      this.scrollViewHeight += nextProps.headerHeight
    }
    if (this.props.memories !== nextProps.memories) {
      let memories = this.pageIndex === 0 ? nextProps.memories : this.state.memories.concat(nextProps.memories)
      this.setState({moreLoading: false, memories})

      if (this.state.refreshing) {
        this.setState({refreshing: false})
        const source = require('../../../../../assets/common/ring/refresh.m4a')
        const sound = new Sound(source, () => sound.play(() => sound.release()))
      }
    }
    if (this.props.updateMemory !== nextProps.updateMemory) {
      this.flatList.scrollToOffset({offset: 0})
      this.pageIndex = 0
      this.requestMemory()
    }
    if (this.props.isLogin !== nextProps.isLogin) {
      this.props.navigation.setParams({headerRight: this.headerRight(nextProps.isLogin)})
      if (nextProps.isLogin) {
        this.requestMemory()
        return true
      }
      this.pageIndex = 0
      this.setState({memories: []})
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

  addMemory = () => {
    this.props.navigation.navigate('MemoryCreate')
  }

  detail = (item) => {
    this.props.navigation.navigate('MemoryMemory', {memory: item})
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
        onPress: () => this.detail(item),
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
        <TouchableOpacity style={style.listItem} onPress={() => this.detail(item)} activeOpacity={0.8}>
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

  ListEmptyComponent = () => {
    return (
      <View style={style.listFooter}>
        <Text style={style.listFooterText}>没有回忆可以显示</Text>
      </View>
    )
  }

  onRefresh = () => {
    if (!this.props.isLogin) return
    Vibration.vibrate(100)
    this.setState({refreshing: true, refreshTitle: '松开刷新'})
  }

  onScrollBeginDrag = () => {
    if (!this.props.isLogin) return
    this.setState({refreshTitle: '下拉刷新'})
  }

  onScrollEndDrag = () => {
    if (this.state.refreshing) {
      this.setState({refreshTitle: ''})
      this.pageIndex = 0
      this.requestMemory()
    }
  }

  onMomentumScrollEnd = (event) => {
    if (event.nativeEvent.contentOffset.y === -1) {
      const source = require('../../../../../assets/common/ring/onRefresh.m4a')
      const sound = new Sound(source, () => sound.play(() => sound.release()))
      this.scrollView.scrollTo({x: 0, y: -70, animated: true})
      this.setState({refreshing: true, refreshTitle: ''})
      this.pageIndex = 0
      this.requestMemory()
    }
  }

  render() {
    const {refreshing, refreshTitle, memories} = this.state
    let refreshControl = <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh}
                                         tintColor={COLOR_SYS} title={refreshTitle} titleColor={COLOR_SYS}/>
    return (
      <ScrollView ref={ref => this.scrollView = ref} onLayout={this.onLayout}
                  style={style.scroll} contentContainerStyle={style.scrollContent}
                  refreshControl={refreshControl} onMomentumScrollEnd={this.onMomentumScrollEnd}
                  onScrollBeginDrag={this.onScrollBeginDrag} onScrollEndDrag={this.onScrollEndDrag}>
        <FlatList
          ref={ref => this.flatList = ref}
          style={style.list}
          data={memories}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={this.ListEmptyComponent}
          ListFooterComponent={this.ListFooterComponent()}
          onScroll={this.onScroll}
        />
      </ScrollView>
    )
  }
}

Content.propTypes = {
  version: PropTypes.number.isRequired,
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
    version: state.memory.main.version,
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