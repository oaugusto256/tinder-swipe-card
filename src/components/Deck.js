import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gesture) => {
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        console.log(event, gesture);
        position.setValue({
          x: gesture.dx,
          y: gesture.dy
        });
      },
      onPanResponderRelease: (event, gesture) => {},
      onPanResponderEnd: (event, gesture) => {}
    });

    this.state = { panResponder, position };
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.75, 0, SCREEN_WIDTH * 1.75],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    return this.props.data.map((card, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={card.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(card)}
          </Animated.View>
        );
      }

      return this.props.renderCard(card);
    });
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}
