import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';

import Input from './basic/TextInput';
import Button from './basic/Button';
import Select from './basic/Select';

import actions from '../actions/CostumeActions';
import { clothSizes } from '../helpers/cloth-sizes';

export default class CostumeAdding extends Component {
    state = {
        newCostumeId: '',

        size: 'SW',
        composition: '',
    }

    onCostumeIdChange = (value) => {
        console.log('CostumeAddingForm.js onCostumeIdChange() needs CHECKING target.value!!', value)
        // it must be stringed integer between 000 and 999
        this.setState({ newCostumeId: value });
    }

    onCostumeSizeChange = (text) => {
        this.setState({ size: text })
    }

    onCostumeCompositionChange = (text) => {
        this.setState({ composition: text })
    }
    render() {
        const props = this.props;
        const { size, composition, newCostumeId } = this.state;

        const newCostume = {
//           id: '124',
            size,
            //           size: 5,
            composition,
            owner: null,
            companyOwner: null,
            wasWashedInside: null,
            location: null,
            wasCertifiedDate: null,
            isCertifiedTillDate: null,
            history: [],
        }

//        console.log('render CostumeAddingForm', newCostumeId, newCostume);
//                <Input
//                    placeholder="Введите размер костюма"
//                    style={{width: 300}}
//                    onChange={this.onCostumeSizeChange}
//                    mergeStyles
//                    text={size}
//                />
        return (
            <View>
                <Text>Добавить новый гидрокостюм</Text>
                <Input
                    placeholder="Введите номер костюма"
                    style={{width: 300}}
                    onChange={this.onCostumeIdChange}
                    mergeStyles
                    text={newCostumeId}
                />
                <Text>Выберите размер костюма: </Text>
                <Select
                    options={clothSizes}
                    onChange={this.onCostumeSizeChange}
                    selectedValue={size}
                />
                <Input
                    placeholder="Укажите комплектность костюма"
                    style={{width: 300}}
                    onChange={this.onCostumeCompositionChange}
                    mergeStyles
                    text={composition}
                />
                <Button
                    action
                    text="Добавить гидрокостюм"
                    onClick={() => { props.onAddCostumePressed(newCostume, newCostumeId) }}
                />

                <Button onClick={props.onBackButtonPressed} text="Вернуться к списку гидрокостюмов"/>
            </View>
        );
    }
}
