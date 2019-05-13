import React from 'react';
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import Deck from './src/components/Deck';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'
  }
];

export default class App extends React.Component {
  renderCard(card) {
    return (
      <View key={card.id} style={styles.card}>
        <Image
          resizeMode={'cover'}
          source={{ uri: card.uri }}
          style={{ height: '100%', width: '100%', borderRadius: 10 }}
        />
      </View>
    );
  }

  renderNoMoreCards() {
    return (
      <View
        style={{
          height: SCREEN_HEIGHT - SCREEN_HEIGHT / 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '600' }}>No more cards!</Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 25,
          paddingTop: 60,
          width: SCREEN_WIDTH,
          backgroundColor: '#f7f7f7'
        }}
      >
        <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderColor: '#f4f4f4',
    borderWidth: 1,
    height: SCREEN_HEIGHT - SCREEN_HEIGHT / 5,
    width: SCREEN_WIDTH - 45,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
