import {ADD_DECK, GET_DECKS, ADD_CARD, GET_DECK} from '../utils/constants'
import * as svcs from '../services'

export const addDeck = (title) => dispatch => (
    svcs.saveDeck(title)
      .then(() => dispatch({
          type: ADD_DECK,
          title
      }))
);

export const fetchDecks = () => dispatch => (
    svcs.getDecks()
      .then(decks => dispatch({
          type: GET_DECKS,
          decks
      }))
);

export const addCard = (title, card) => dispatch => (
    svcs.addCardToDeck(title, card)
      .then(() => dispatch({
          type: ADD_CARD,
          title,
          card
      }))
)

export const getDeck = (title) => dispatch => (
    svcs.getDeck(title)
      .then(deck => dispatch({
          type: GET_DECK,
          deck
      }))
);