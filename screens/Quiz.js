import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  Container, Card, CardItem, Body, Content
} from 'native-base';


class Quiz extends React.Component {

  state = {
    idxQuestion: 0,
    showAnswer: false,
    finish: false,
    corrects: 0
  }

  navigate(pos) {

    const { questions } = this.props
    const numQuestions = questions.length
    let currPos = this.state.idxQuestion + pos

    if (currPos < 0)
      return 0

    if (currPos >= numQuestions) {
      currPos = numQuestions - 1
      this.setState({ finish: true })
    }

    return currPos

  }

  restart() {
    this.setState({ idxQuestion: 0, finish:false, corrects:0 })
    this.showAnswer(false)

  }

  answer(value) {
    const pos = this.navigate(1)
    let valCorrect = value===1?1:0
    this.setState({ idxQuestion: pos, corrects: this.state.corrects + valCorrect })
    this.showAnswer(false)

  }

  showAnswer(value) {
    this.setState({ showAnswer: value })
  }

  render() {

    const questions = this.props.questions
    const { showAnswer, idxQuestion } = this.state
    const currQuestion = questions[idxQuestion]
    const totalQuestions = questions.length

    return (

      <Container>

        <Content style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 40 }}>
          <Card>
            {
              this.state.finish ? (

                <CardItem bordered style={{ height: 150 }}>
                  <Body style={{ alignItems: "center" }}>
                    <Text>{this.state.corrects} corrects of {totalQuestions}</Text>
                  </Body>
                </CardItem>

              ) : (
                  <View>
                    <CardItem>
                      <Text>{idxQuestion + 1}/{totalQuestions}</Text>
                    </CardItem>
                    <CardItem bordered style={{ height: 150 }}>
                      <Body style={{ alignItems: "center" }}>

                        {showAnswer ? (<Text style={{ paddingBottom: 30 }}>{currQuestion.answer}</Text>)
                          : (<Text style={{ paddingBottom: 30 }}>{currQuestion.question}</Text>)}

                        <TouchableOpacity onPress={() => this.showAnswer(!this.state.showAnswer)}>
                          {showAnswer ? (<Text>Show question</Text>) : (<Text>Show Answer</Text>)}
                        </TouchableOpacity>

                      </Body>
                    </CardItem>
                  </View>
                )
            }
          </Card>

            {
              this.state.finish ? (
                <TouchableOpacity  style={styles.btnIncorrect}
                  onPress={() => this.restart()}>
                  <Text>Restart</Text>
                </TouchableOpacity>

              ) : (
                  <View style={{flexDirection: "row",justifyContent: 'space-between',}}>
                    <TouchableOpacity disabled={!this.state.showAnswer} style={styles.btnIncorrect}
                      onPress={() => this.answer(0)}>
                      <Text>Incorrect</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={!this.state.showAnswer} style={styles.btnCorrect}
                      onPress={() => this.answer(1)}>
                      <Text>Correct</Text>
                    </TouchableOpacity>
                  </View>
                )
            }

          

        </Content>

      </Container>



    );
  }
}

const styles = StyleSheet.create({

  btnCorrect: {
    alignItems: 'center',
    backgroundColor: 'silver',
    padding: 10,
    width: 150
  },

  btnIncorrect: {
    alignItems: 'center',
    backgroundColor: 'silver',
    padding: 10,
    width: 150
  },

})

function mapStateToProps(data, { navigation }) {
  const { title } = navigation.state.params;
  return {
    questions: data[title].questions.map((item) => {
      item.correct = false
      return item
    })
  }
}

export default connect(mapStateToProps)(Quiz);
