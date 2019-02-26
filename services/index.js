import {FLASHCARDS_KEY, NOTIFICATION_KEY} from '../utils/constants'
import {initialData} from '../utils/initialData'
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const getDecks = () => {
    
  return AsyncStorage.getItem(FLASHCARDS_KEY)
      .then( results => {
          if(results == null) {
              AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(initialData));
              return initialData;
          } else {
            //AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(initialData));
              return JSON.parse(results);
          }
      });
}

export const getDeck = (id) => {
  return AsyncStorage.getItem(FLASHCARDS_KEY)
      .then(res => {
          const data = JSON.parse(res);
          return data[id];
      })
}

export const saveDeck = (title) => {
  return AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify({
      [title]: {
          title,
          questions: []
      }
  }))
}

export const addCardToDeck = (title, card) => {
  return AsyncStorage.getItem(FLASHCARDS_KEY)
      .then(results => {
          return JSON.parse(results)[title]
      })
      .then(data => {
          const {question, answer} = card;
          const questions = data.questions.concat({
              question,
              answer
          });
          AsyncStorage.mergeItem(FLASHCARDS_KEY, JSON.stringify({
              [title]: {
                  title,
                  questions
              }
          }));
      })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(), {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}

function createNotification() {
    return {
      title: 'Swipe your cards!',
      body: "👋 don't forget to swipe your cards for today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }

  