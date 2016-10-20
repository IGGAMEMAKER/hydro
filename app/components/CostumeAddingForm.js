import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';

import Input from './basic/TextInput';
import Button from './basic/Button';

export default class CostumeAdding extends Component {
    render() {
        const props = this.props;

        return (
            <View>
                <Text>Добавить новый гидрокостюм</Text>
                <Input
                    placeholder="Введите номер костюма"
                    style={{width: 300}}
                    mergeStyles
                />

                <Button onClick={props.onBackButtonPressed} text="Вернуться к списку гидрокостюмов"/>
            </View>
        );
    }
}
