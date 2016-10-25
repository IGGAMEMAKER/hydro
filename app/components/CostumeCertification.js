import React, { Component } from 'react';

import {
    View,
    ScrollView,
    Text
} from 'react-native';

import Checkbox from './basic/Checkbox';
import Input from './basic/TextInput';
import Button from './basic/Button';

import dateFormatter from '../helpers/date-formatter';
import words from '../helpers/certification-words';


import actions from '../actions/CostumeActions';

export default class CostumeCertification extends Component {
    onDayChange = (value) => {
        this.setState({ day: value })
    }
    onMonthChange = (value) => {
        this.setState({ month: value })
    }
    onYearChange = (value) => {
        this.setState({ year: value })
    }

    onCheckBoxChange = (id) => {
        return (value) => {
            console.log('onCheckBoxChange in CostumeCertification.js', value);

            const checkboxes = this.state.checkboxes;
            checkboxes[id] = value;
            this.setState({ checkboxes })
        }
    }
    state = {
//        checkboxes: [1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
        checkboxes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//        checkboxes: [0,0],
        day: null,
        month: null,
        year: null
    }

    componentWillMount() {
        if (!this.props.editable) {
            this.setState({ checkboxes: this.props.costume.certification });
        }
    }

    submitCertification = () => {
        const { checkboxes, day, month, year } = this.state;
        actions.submitCertification(this.props.id, checkboxes, day, month, year);

        this.props.onSubmitCertification(this.props.id);
    }

    renderCostumeCertificationTests = (checkboxes, editable) => {
        return words.map((w, i) => {
            let component = <Text>{checkboxes[i] === 1 ? 'Да': 'Нет'}</Text>;

            if (editable) {
                component = <Checkbox isChecked={!!checkboxes[i]} onChange={this.onCheckBoxChange(i)} />;
            }
            return (
               <View style={{ marginBottom: 12 }} key={i}>
                   <Text>{w}</Text>
                   {component}
               </View>
           )
       })
    }

    render() {
        const state = this.state;
        const editable = this.props.editable;
//                            <Text>Дата сертификации (сегодня): {dateFormatter(new Date())}</Text>
//                            <Text>Сертификация действительна до:</Text>
//
//                            <Input onChange={this.onYearChange} style={{ width: 200 }} placeholder="Год" />
//                            <Input onChange={this.onMonthChange} style={{ width: 200 }} placeholder="Месяц" />
//                            <Input onChange={this.onDayChange} style={{ width: 200 }} placeholder="День" />
        return (
            <ScrollView>
                <Text style={{ fontSize: 22, marginBottom: 12 }}>
                    {
                        editable? 'Сертификация гидрокостюма': 'Последний техосмотр гидрокостюма'
                    }
                </Text>
                {this.renderCostumeCertificationTests(state.checkboxes, editable)}
                {
                    editable?
                        <View>
                            <View style={{ marginBottom: 12, display: editable? 'block': 'none' }}>
                                <Button onClick={this.submitCertification} text="Сохранить результаты сертификации" />
                            </View>
                        </View>
                        :
                        <Text></Text>
                }
                <View style={{ marginBottom: 12 }}>
                    <Button onClick={this.props.onBackButtonPressed} text="Вернуться в главное меню" />
                </View>
            </ScrollView>
        );
//                <Input onChange= style={{ width: 200 }} placeholder="Комментарий к проверке" />
    }
}