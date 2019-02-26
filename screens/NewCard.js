import React, { Component } from "react";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";

import { addCard } from "../actions";

import { Container, Content, Card, CardItem } from "native-base";

const styles = StyleSheet.create({

  btnAddCard: {
    backgroundColor: 'silver',
    padding: 10,
    width: 150,
    alignItems:"center"    
  }
})

class NewCard extends Component {

  state = {
    answer: "",
    question: ""
  };

  createCard(title){

    if (this.state.question !== "" && this.state.answer) {
      
      const card = {
        question: this.state.question,
        answer: this.state.answer
      };

      const { navigation, refresh } = this.props;

      this.props.addCard(title, card).then(() => {
        refresh()
        navigation.goBack()  
      })
      

    }
  }

  handleQuestionChange = question => {
    this.setState({ question: question });
  };

  handleAnswerChange = answer => {
    this.setState({ answer: answer });
  };

  render() {

    const { navigation } = this.props
    const { title } = navigation.state.params

    return (
      <Container>
        <Content>
          <Card>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Card {title}</Text>
            <CardItem>
              <View>
                <Text>Question:</Text>
                <TextInput
                  value={this.state.question}
                  placeholder={"Enter the card question"}
                  onChangeText={question => this.handleQuestionChange(question)}
                />
                <Text>Answer:</Text>
                <TextInput
                  value={this.state.answer}
                  placeholder={"Enter the card answer"}
                  onChangeText={answer => this.handleAnswerChange(answer)}
                />
              </View>
            </CardItem>
          </Card>

          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity style={styles.btnAddCard} onPress={() => this.createCard(title)}>
              <Text>Add Card</Text>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    );
  }
}


function mapStateToProps(data, { navigation }) {
  
  const { refresh } = navigation.state.params;

  return {
    data, navigation, refresh
  }
}

export default connect(mapStateToProps, { addCard })(NewCard);



