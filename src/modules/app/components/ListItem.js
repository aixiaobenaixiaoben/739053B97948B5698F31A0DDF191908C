/** @flow */
import React, {Component} from "react"
import {ImageBackground, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"

import * as actions from "../actions/ListItem"
import style from "./styles/ListItem"


class ListItem extends Component<any, any> {

  _isVisited = () => {
    const { movie, visit } = this.props;
    return visit.indexOf(movie.id) !== -1
  };

  _onPress = () => {
    const { onPressItem, movie, visitItem } = this.props;
    if (!this._isVisited()) {
      visitItem(movie.id);
      this.setState({});
    }
    onPressItem(movie.id);
  };

  render() {
    const { movie } = this.props;
    const {
      title,
      rating: {average: rate},
      directors,
      casts,
      images: {small: imageUri}
    } = movie;

    let directorNames = '';
    for (const {name} of directors) {
      directorNames += ' ' + name;
    }

    let castNames = '';
    for (const {name} of casts) {
      castNames += ' ' + name;
    }

    const styleVisited = this._isVisited() ? {
      borderRightColor: 'tomato',
      borderRightWidth: 4,
    } : {};

    return (
      <View style = {[style.ListItem, styleVisited]}>

        <View style = {style.video}>
          <TouchableOpacity onPress = {() => alert('暂时无法观看预告片')}>
            <ImageBackground source = {{uri: imageUri}} style = {style.imageBack}>
              <View style = {style.play}>
                <FontAwesome name='play' size={15}/>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style = {style.detail}>
          <TouchableOpacity style = {style.touch} onPress = {this._onPress}>
            <Text style = {style.textFirst} numberOfLines ={1}>
              {title}
            </Text>
            <Text style = {style.text}>
              豆瓣评分 <Text style = {{color: 'tomato'}}>{rate}</Text>
            </Text>
            <Text style = {style.text}>
              导演:{directorNames}
            </Text>
            <Text style = {style.text} numberOfLines ={1}>
              主演:{castNames}
            </Text>
          </TouchableOpacity>
        </View>

        <View style = {style.buy}>
          <TouchableOpacity style = {style.buyTouch} onPress = {() => alert('暂时无法购票')}>
            <Text style = {{color: 'white'}}>购票</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

ListItem.propTypes = {
  visit: PropTypes.array.isRequired,
  visitItem: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    visit: state.app.listItem.visit,
  }),
  dispatch => ({
    visitItem: id => dispatch(actions.visitItem(id)),
  })
)(ListItem);
