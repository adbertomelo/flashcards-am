import React from 'react'
import { Button, Container } from 'native-base';
import { connect } from 'react-redux';
import * as fn from '../utils/fn'

import {
  StyleSheet, Text, View
} from 'react-native'


const styles = StyleSheet.create({

  btnQuiz: {
    paddingLeft:15,
    paddingRight:15
  },
  btnNewQuestion:{
    paddingRight:15,
    paddingLeft:15    
  }

})

class DeckDetail extends React.Component {

  refresh() {
    this.setState({});
  }

  render() {
    
    const { navigation, questions } = this.props
    const { title } = navigation.state.params
    const questionsCount = questions.length
    const questionsCountText = fn.getQuestionsText(questionsCount)

    const disabledQuizButton = (
      <Button block light style={styles.btQuiz}>
        <Text>Start Quiz</Text>
      </Button>
    );

    const quizButton = questionsCount === 0
      ? disabledQuizButton
      : (
        <Button light style={styles.btnQuiz}
          onPress={() => {
            navigation.navigate("Quiz", { title });
          }}
        >
          <Text>Start Quiz</Text>
        </Button>
      )

    return (
      <Container>

        <View style={{ alignItems: "center", paddingTop:30}}>
          <Text style={{fontSize: 25,fontWeight: 'bold'}}>{title}</Text>
          <Text>{questionsCountText}</Text>
        </View>
        <View style={{paddingTop:20}}>
        </View>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <Button primary style={styles.btnNewQuestion} 
          onPress={() => navigation.navigate("NewCard", {
                                                          title:title,
                                                          refresh: this.refresh.bind(this)                                                          
                                                         })}>
            <Text>Add Card</Text>
          </Button>
          <Text style={{paddingRight:5, paddingLeft:5}}></Text>
          {quizButton}
        </View>

      </Container>
    );
  }
}

function mapStateToProps(data, { navigation }) {
  
  const { title } = navigation.state.params;
  const questions = data[title]? data[title].questions : []

  return {
    questions
  }
}

export default connect(mapStateToProps)(DeckDetail);
