import React, { Component } from 'react';

import {
    View,
    ScrollView,
    Text
} from 'react-native';

import Checkbox from './basic/Checkbox';
import Input from './basic/TextInput';
import dateFormatter from '../helpers/date-formatter';

import Button from './basic/Button';

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
            const checkboxes = this.state.checkboxes;
            checkboxes[id] = value === 'yes' ? 1 : 0;
            this.setState({ checkboxes })
//            return value === 'yes';
        }
    }
    state = {
        checkboxes: [1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
//        checkboxes: [0,0],
        day: null,
        month: null,
        year: null
    }

    submitCertification = () => {
        const { checkboxes, day, month, year } = this.state;
        actions.submitCertification(this.props.id, checkboxes, day, month, year);

        this.props.onSubmitCertification(this.props.id);
    }

    renderCostumeCertificationTests = (checkboxes, editable) => {
        const words = [
            'Отметить на сервисной карте серийный номер.',
            'Убедиться в том, что карман HPL и антенный модуль пусты и не повреждены. С радио-маяком следует обращаться согласно установленной процедуре.',
            'Проверить, что внутри костюма отсутствуют какие-либо посторонние предметы. Снять подкладку. Молния на подкладке должна быть проверена на предмет отсутствующих зубьев и фиксирующих петель.',
            'Требуется ли дополнительная чистка, снаружи/внутри?',
            'Водонепроницаемые молнии не повреждены, легко совмещаются, застегиваются и расстегиваются.',
            'Проверить на наличие видимых повреждений на материале, сварочных лентах и швах.',
            'Проверить наличие повреждений лицевых и запястных уплотнений.',
            'Проверить, не повреждены ли ботинки и перчатки.',
             '8 отражающих полос не повреждены (никаких повреждений или менее 10% проскальзывания).',
             'Свисток и шнур не повреждены.',
             'Страховочная линия и крюк функционируют.',
             'Подъемный строп с треугольником и крюк карабина функционируют.',
             'Старый фонарь: Проверить на наличие повреждений карман для фонаря, фонарь и вытяжное кольцо. Переместить переключатель в положение «отключен» (протолкнуть путем захвата штока, но не кольца).',
             'Новый фонарь: Проверить карман для фонаря, фонарь и ручной рычаг активации вкл/выкл (переключатель). Переместить переключатель в положение «выкл» для хранения. Заменить фонарь, если до истечения срока годности осталось меньше 6 месяцев.',
             'Фонари перчаток (если применимо): Карман для фонаря и фонарь не должны иметь повреждений, фонарь должен быть закреплен в кармане. Проверить включение и выключение, нажав на красную кнопку. Если красный индикатор мигает, батареи необходимо заменить.',
             'Убедиться, что клапан и шланг на надувном воротнике не повреждены и функционируют.',
             'Снять дыхательную систему и вставить заглушку в респиратор, если применимо.',
             'Проверить липучки и петли страховки.'
        ];
        return words.map((w, i) => {
            let component = <Text>{checkboxes[i] === 1 ? 'Да': 'Нет'}</Text>;

            if (editable) {
                component = <Checkbox isChecked={!!checkboxes[i]} />;
            }
            return (
               <View>
                   <Text>{w}</Text>
                   {component}
               </View>
           )
       })
    }

    render() {
        const state = this.state;
        const editable = this.props.editable;

        return (
            <ScrollView>
                <Text style={{ fontSize: 22, marginBottom: 12 }}>Сертификация гидрокостюма</Text>
                {this.renderCostumeCertificationTests(state.checkboxes, editable)}

                <Text>Дата сертификации (сегодня): {dateFormatter(new Date())}</Text>
                <Text>Сертификация действительна до:</Text>
                <Input onChange={this.onYearChange} style={{ width: 200 }} placeholder="Год" />
                <Input onChange={this.onMonthChange} style={{ width: 200 }} placeholder="Месяц" />
                <Input onChange={this.onDayChange} style={{ width: 200 }} placeholder="День" />

                <View style={{ marginBottom: 12 }}>
                    <Button onClick={this.submitCertification} text="Сохранить результаты сертификации" />
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Button onClick={this.props.onBackButtonPressed} text="Вернуться в главное меню" />
                </View>
            </ScrollView>
        );
//                <Input onChange= style={{ width: 200 }} placeholder="Комментарий к проверке" />
    }
}