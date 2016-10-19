import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';


//type

export default class CostumeView extends Component {
    render() {
        const props = this.props;

        return (
            <View>
                <Text>{JSON.stringify(props.data)}</Text>
                <Text>{props.id}</Text>
            </View>
        );
    }
}