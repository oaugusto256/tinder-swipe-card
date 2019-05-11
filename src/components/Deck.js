import React, { Component } from 'react';
import { View, Animated } from 'react-native';

export default class Deck extends Component {
  renderCards() {
    return this.props.data.map(card => {
      return this.props.renderCard(card);
    });
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}
