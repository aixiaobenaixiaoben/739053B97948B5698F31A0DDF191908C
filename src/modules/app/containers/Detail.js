/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"

import * as actions from "../actions/Detail"
import style from "./styles/Detail"
import Progress from "../components/Progress"


class Detail extends Component<any, any> {

  componentDidMount(){
    const id = this.props.navigation.getParam('id');
    this.props.requestMovie(id);
  }

  render() {
    const { movie, marks, toggleWatched, toggleWish } = this.props;
    if (Object.keys(movie).length === 0) {
      return <Progress/>;
    }

    const {
      id,
      title,
      year,
      rating: {average},
      ratings_count,
      images: {large: imageUri},
      genres = [],
      durations,
      mainland_pubdate,
      languages,
      wish_count,
      summary,
      countries
    } = movie;

    let watchColor = 'gray', wishColor = 'gray';
    if (marks[id] !== undefined) {
      let { watched, wish } = marks[id];
      watchColor = watched ? 'tomato' : watchColor;
      wishColor = wish ? 'tomato' : wishColor;
    }

    return (
      <View style={style.view}>

        <ScrollView style = {style.viewDetail}>

          <View style = {style.viewInfo}>
            <View style = {style.titles}>
              <Text style = {style.textFirst} numberOfLines ={2}>{title}</Text>
              <Text style = {style.text}>{genres.join(' ')}</Text>
              <Text style = {style.text}>{countries.join(' ')} {durations.join(' ')}</Text>
              <Text style = {style.text}>{mainland_pubdate} 在中国大陆上映</Text>
            </View>
            <Image source = {{uri: imageUri}} style = {style.image}/>
          </View>

          <View style = {style.viewCount}>
            <View style = {style.countSub}>
              <Text style = {style.countText}>首映年份:</Text>
              <Text style = {style.countText}>{year}</Text>
            </View>
            <View style = {style.countSub}>
              <Text style = {style.countText}>电影语言:</Text>
              <Text style = {style.countText}>{languages.join(' ')}</Text>
            </View>
            <View style = {style.countSub}>
              <Text style = {style.countText}>观众评分:</Text>
              <Text style = {style.countText}>{average}</Text>
            </View>
            <View style = {style.countSub}>
              <Text style = {style.countText}>参与评分人数:</Text>
              <Text style = {style.countText}>{ratings_count}</Text>
            </View>
            <View style = {style.countSub}>
              <Text style = {style.countText}>想看人数:</Text>
              <Text style = {style.countText}>{wish_count}</Text>
            </View>
          </View>

          <View style = {style.viewMark}>
            <TouchableOpacity style = {style.markTouch} onPress = {() => toggleWatched(id)}>
              <FontAwesome name='heart' size={20} color = {watchColor}/>
              <Text style = {style.markText}>想看</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {style.markTouch} onPress = {() => toggleWish(id)}>
              <FontAwesome name='star' size={20} color = {wishColor}/>
              <Text style = {style.markText}>看过</Text>
            </TouchableOpacity>
          </View>

          <View style = {style.viewSummary}>
            <Text style = {style.textSummary}>{summary}</Text>
          </View>

        </ScrollView>

        <View style = {style.viewBottom}>
          <TouchableOpacity style = {style.buyTouch} onPress = {() => this.props.navigation.pop()}>
            <Text style = {style.buyTouchText}>无法购票,返回列表</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

Detail.propTypes = {
  movie: PropTypes.object.isRequired,
  marks: PropTypes.object.isRequired,
  requestMovie: PropTypes.func.isRequired,
  toggleWatched: PropTypes.func.isRequired,
  toggleWish: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    movie: state.app.detail.movie,
    marks: state.app.detail.marks,
  }),
  dispatch => ({
    requestMovie: id => dispatch(actions.requestMovie(id)),
    toggleWatched: id => dispatch(actions.toggleWatched(id)),
    toggleWish: id => dispatch(actions.toggleWish(id)),
  })
)(Detail);
