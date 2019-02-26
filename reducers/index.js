import {
    ADD_DECK,
    GET_DECKS,
    ADD_CARD,
    GET_DECK
} from '../utils/constants'

import { initialData } from '../utils/initialData'

function decks(state = initialData, action) {
    switch (action.type) {
        case GET_DECK: {
            return action.deck;
        }
        case GET_DECKS: {
            return action.decks;
        }
        case ADD_DECK: {
            const { title } = action;
            const res = {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            }

            return res
        }
        case ADD_CARD: {
            console.log("add_card")
            const stateCopy = { ...state }
            stateCopy[action.title].questions.push(action.card)
            return stateCopy
        }
        default:
            return state
    }
}

export default decks
