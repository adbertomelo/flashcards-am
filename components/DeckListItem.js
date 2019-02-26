import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Right, Icon} from 'native-base';

export default class DeckListItem extends React.Component {
    render() {
        
        const { item, navigation } = this.props;
        const questionsCount = item.questions.length;
        const questionsCountText = `${questionsCount} question${questionsCount>1?"s":""}`

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('deckDetail', {title: item.title})}
                >
                <Card style={{marginLeft:30,marginRight:50,width:300,height:100}}>
                    <CardItem>
                        <View>
                            <Text style={{fontSize: 25,fontWeight: 'bold'}}>
                                {item.title}
                            </Text>
                            <Text>
                                {questionsCountText}
                            </Text>
                        </View>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
}
