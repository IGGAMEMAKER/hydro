import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';

import Button from './basic/Button';

export default class CostumeView extends Component {
    render() {
        const props = this.props;

        return (
            <View>
                <Text>{JSON.stringify(props.data)}</Text>
                <Text>{props.id}</Text>
                <Button
                    onClick={props.onBackButtonPressed}
                    text="Вернуться к списку гидрокостюмов"
                ></Button>
            </View>
        );
    }
}