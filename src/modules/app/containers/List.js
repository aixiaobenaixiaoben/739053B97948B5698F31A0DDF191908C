/** @flow */
import React, {Component} from "react"
import {FlatList} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import ListItem from "../components/ListItem"
import * as actions from "../actions/List"


class List extends Component<any, any> {

  componentDidMount(){
    this.props.requestList();
  }

  _keyExtractor = (item) => item.id;

  _onPressItem = (id: string) => {
    this.props.navigation.navigate('AppDetail', {id});
  };

  _renderItem = ({item}) => (
    <ListItem
      movie={item}
      onPressItem={this._onPressItem}
    />
  );

  render() {
    const { subjects = []} = this.props.movies;
    return (
      <FlatList
        data = {subjects}
        keyExtractor = {this._keyExtractor}
        renderItem = {this._renderItem}
      />
    );
  }
}

List.propTypes = {
  movies: PropTypes.object.isRequired,
  requestList: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    movies: state.app.list.movies,
  }),
  dispatch => ({
    requestList: () => dispatch(actions.requestList()),
  })
)(List);
