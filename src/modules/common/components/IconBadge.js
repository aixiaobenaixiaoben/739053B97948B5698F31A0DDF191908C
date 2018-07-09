/** @flow */
import React, {Component} from "react"
import {Text, View, ViewPropTypes} from 'react-native'
import PropTypes from "prop-types"

import style from "./styles/IconBadge"


class IconBadge extends Component<any, any> {

  render() {
    const {
      hidden,
      icon,
      badge = '',
      iconStyle = {},
      badgeStyle = {}
    } = this.props;

    const dotStyle = badge.length === 0 ? style.badgeDot : {}

    return (
      <View style={[style.icon, iconStyle]}>
        {icon}
        { !hidden &&
        <View style={[style.badge, dotStyle, badgeStyle]}>
          <Text style={style.text}>{badge}</Text>
        </View>
        }
      </View>
    )
  }
}

IconBadge.propTypes = {
  hidden: PropTypes.bool.isRequired,
  icon: PropTypes.element.isRequired,
  badge: PropTypes.string,
  iconStyle: ViewPropTypes.style,
  badgeStyle: ViewPropTypes.style,
}

export default IconBadge;