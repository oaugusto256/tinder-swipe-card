import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

export default class Deck extends Component {
  constructor(props) {
    super(props);

    this._panResponder = PanResponder.create({
      onPanResponderMove: (event, gesture) => {
        console.log(event, gesture);
        return true;
      },
      onPanResponderRelease: () => {},
      onStartShouldSetPanResponder: (e, gestureState) => {
        console.log(gestureState);
        return true;
      },

      onPanResponderEnd: (e, gestureState) => {
        console.log(gestureState);
        return true;
      }
    });
  }

  renderCards() {
    return this.props.data.map(card => {
      return this.props.renderCard(card);
    });
  }

  render() {
    return <View {...this._panResponder.panHandlers}>{this.renderCards()}</View>;
  }
}
