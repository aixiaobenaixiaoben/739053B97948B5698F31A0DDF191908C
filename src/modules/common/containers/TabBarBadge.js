/** @flow */
import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import IconBadge from "../components/IconBadge"


class TabBarBadge extends Component<any, any> {

  shouldComponentUpdate() {
    const { tab, tabBarBadge: {tabWillUpdate}} = this.props
    return tab === tabWillUpdate
  }

  render() {
    const { tab, icon } = this.props
    const {hidden, content} = this.props.tabBarBadge[tab]

    return (<IconBadge hidden={hidden} icon={icon} badge={content}/>)
  }
}

TabBarBadge.propTypes = {
  tab: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  tabBarBadge: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    tabBarBadge: state.common.tabBarBadge
  })
)(TabBarBadge)