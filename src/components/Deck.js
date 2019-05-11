import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

export default class Deck extends Component {
  constructor(props) {
    super(props);

    const panResponder = PanResponder.create({});

    this.panResponder = panResponder;
  }

  renderCards() {
    return this.props.data.map(card => {
      return this.props.renderCard(card);
    });
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}
