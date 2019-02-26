import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { View } from 'react-native'
import Home from './screens/Home'
import DeckDetail from './screens/DeckDetail'
import NewDeck from './screens/NewDeck'
import NewCard from './screens/NewCard'
import Quiz from './screens/Quiz'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider } from 'react-redux'

const Routes = createAppContainer(

  createStackNavigator({
    home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    deckDetail: {
      screen:DeckDetail,
      navigationOptions: {
        title:"Deck"
      }
    },
    newDeck:{
      screen: NewDeck,
      navigationOptions: {
        title:"New Deck"
      }
    },
    Quiz:{
      screen:Quiz,
      navigationOptions:{
        title:"Quiz"
      }
    },
    NewCard:{
      screen:NewCard,
      navigationOptions:{
        title:"New Card"
      }

    }
    ,
  })
  
)

const store = createStore(reducer, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <Routes/>
        </View>
      </Provider>
    );
  }
}

