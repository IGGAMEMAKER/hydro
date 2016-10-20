import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';

import Input from './basic/TextInput';
import Button from './basic/Button';

import actions from '../actions/CostumeActions';

export default class CostumeAdding extends Component {
    render() {
        const props = this.props;
        const newCostume = {
           id: '124',
           size: 5,
           owner: null,
           companyOwner: null,
           wasWashedInside: new Date(1, 2, 2000),
           location: 'участок 2'
        }
        return (
            <View>
                <Text>Добавить новый гидрокостюм</Text>
                <Input
                    placeholder="Введите номер костюма"
                    style={{width: 300}}
                    mergeStyles
                />
                <Input
                    placeholder="Введите размер костюма"
                    style={{width: 300}}
                    mergeStyles
                />
                <Input
                    placeholder="Укажите комплектность костюма"
                    style={{width: 300}}
                    mergeStyles
                />
                <Button
                    action
                    text="Добавить гидрокостюм"
                    onClick={() => { props.onAddCostumePressed(newCostume) }}
                />

                <Button onClick={props.onBackButtonPressed} text="Вернуться к списку гидрокостюмов"/>
            </View>
        );
    }
}
