/** @flow */
import React, {Component} from "react"
import Content from "./Content"


class Main extends Component<any, any> {

  render() {
    return <Content {...this.props}/>
  }
}

export default Main