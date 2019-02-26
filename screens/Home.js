import { connect } from 'react-redux';
import { fetchDecks } from '../actions';
import React, { Component } from 'react'
import DeckListItem from '../components/DeckListItem'
import ActionButton from 'react-native-action-button'

import { 
    Container, 
    Card, 
    CardItem, 
    Body, 
    Header } from 'native-base';

import {
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'

const styles = StyleSheet.create({

  homeMessage: {
    fontSize:20
  },
  homeCard:{
    paddingTop:30
  }

})


class Home extends React.Component {

  componentDidMount() {
    this.props.getDecks()
  }

  render() {

    const navigation = this.props.navigation;
   
    return (

      <Container>
        
        <Card transparent>
          <CardItem style={styles.homeCard}>
            <Body>
              <Text style={styles.homeMessage}>Hello, choose or create a new Deck</Text>
            </Body>
          </CardItem>
        </Card>

        <ScrollView>

          <FlatList
            style={{ paddingTop: 20 }}
            data={this.props.decks}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <DeckListItem navigation={navigation} item={item} />
            )}
          />


        </ScrollView>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { navigation.navigate("newDeck", {title: ""}) }}
        />

      </Container>
    );
  }
}

function mapStateToProps(decksData) {
  
  return {
      decks: Object.keys(decksData).reduce((decks, id) => {
        return decks.concat(decksData[id]);
    }, [])
  }

}

function mapDispatchToProps (dispatch) {

  return {
      getDecks: () => dispatch(fetchDecks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
