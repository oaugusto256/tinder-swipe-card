import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.45;
const SWIPE_OUT_DURATION = 250;

export default class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('Swipe right!');
          this.forceSwipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('Swipe left!');
        } else {
          this.resetPosition();
        }
      },
      onPanResponderEnd: (event, gesture) => {}
    });

    this.state = { panResponder, position };
  }

  forceSwipeRight() {
    Animated.timing(this.state.position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start();
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.75, 0, SCREEN_WIDTH * 1.75],
      outputRange: ['-130deg', '0deg', '130deg']
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
