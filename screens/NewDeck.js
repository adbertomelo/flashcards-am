import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

import { addDeck } from '../actions';

import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base'

class NewDeck extends Component {

    state = {
        title: ''
    }

    createDeck() {

        if (this.state.title !== '') {
            const title = this.state.title;
            this.props.addDeck(title);
            this.props.navigation.navigate('deckDetail', { title });
        }
    }

    render() {
        return (
            <Container>

                <Text style={{ fontSize: 20, paddingTop: 30, paddingBottom: 20 }}>
                    What is the tite of your new deck?
                    </Text>

                <View style={{ paddingRight: 5, paddingLeft: 5 }}>
                    <TextInput value={this.state.title}
                        placeholder={"Enter the deck title"}
                        onChangeText={(title) => this.setState({ title })}
                    />
                </View>

                <View style={{ paddingTop: 15, paddingBottom: 15 }}></View>

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    <TouchableOpacity style={styles.btnCreate} onPress={() => this.createDeck()}>
                        <Text>Add Deck</Text>
                    </TouchableOpacity>

                </View>

            </Container>
        )
    }
}

const styles = StyleSheet.create({

    btnCreate: {
        alignItems: 'center',
        backgroundColor: 'silver',
        padding: 10,
        width: 150
    },


})

export default connect(null, {
    addDeck
})(NewDeck);



