import React from 'react';
import { Image, ScrollView, View, Text, StyleSheet } from 'react-native';
import Deck from './src/components/Deck';

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
        <Image style={{ height: 225, width: '100%' }} source={{ uri: card.uri }} />
        <Text>{card.text}</Text>
      </View>
    );
  }

  renderNoMoreCards() {
    return (
      <View style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No more cards!</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ padding: 25 }}>
        <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 250,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 5
  }
});
