import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.45;
const SWIPE_OUT_DURATION = 250;

export default class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

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
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('Swipe left!');
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
      onPanResponderEnd: (event, gesture) => {}
    });

    this.state = { panResponder, position, index: 0 };
  }

  onSwipeComple(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;

    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComple(direction));
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
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data
      .map((card, i) => {
        if (i < this.state.index) {
          return null;
        }

        if (i === this.state.index) {
          return (
            <Animated.View
              key={card.id}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(card)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={card.id}
            style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}
          >
            {this.props.renderCard(card)}
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    backgroundColor: '#fff'
  }
};
