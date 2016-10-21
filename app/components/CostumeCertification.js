import React, { Component } from 'react';

import {
    View,
    ScrollView,
    Text
} from 'react-native';

import Checkbox from './basic/Checkbox';
import Input from './basic/TextInput';
import dateFormatter from '../helpers/date-formatter';

export default class CostumeCertification extends Component {
    state = {
//        checkboxes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        checkboxes: [0,0]
    }
    render() {
        const state = this.state;
        const words = [
            'Отметить на сервисной карте серийный номер.',
            'Убедиться в том, что карман HPL и антенный модуль пусты и не повреждены. С радио-маяком следует обращаться согласно установленной процедуре.',
//            'Проверить, что внутри костюма отсутствуют какие-либо посторонние предметы. Снять подкладку. Молния на подкладке должна быть проверена на предмет отсутствующих зубьев и фиксирующих петель.',
//            'Требуется ли дополнительная чистка, снаружи/внутри?',
//            'Водонепроницаемые молнии не повреждены, легко совмещаются, застегиваются и расстегиваются.',
//            'Проверить на наличие видимых повреждений на материале, сварочных лентах и швах.',
//            'Проверить наличие повреждений лицевых и запястных уплотнений.',
//            'Проверить, не повреждены ли ботинки и перчатки.',
//             '8 отражающих полос не повреждены (никаких повреждений или менее 10% проскальзывания).',
//             'Свисток и шнур не повреждены.',
//             'Страховочная линия и крюк функционируют.',
//             'Подъемный строп с треугольником и крюк карабина функционируют.',
//             'Старый фонарь: Проверить на наличие повреждений карман для фонаря, фонарь и вытяжное кольцо. Переместить переключатель в положение «отключен» (протолкнуть путем захвата штока, но не кольца).',
//             'Новый фонарь: Проверить карман для фонаря, фонарь и ручной рычаг активации вкл/выкл (переключатель). Переместить переключатель в положение «выкл» для хранения. Заменить фонарь, если до истечения срока годности осталось меньше 6 месяцев.',
//             'Фонари перчаток (если применимо): Карман для фонаря и фонарь не должны иметь повреждений, фонарь должен быть закреплен в кармане. Проверить включение и выключение, нажав на красную кнопку. Если красный индикатор мигает, батареи необходимо заменить.',
//             'Убедиться, что клапан и шланг на надувном воротнике не повреждены и функционируют.',
//             'Снять дыхательную систему и вставить заглушку в респиратор, если применимо.',
//             'Проверить липучки и петли страховки.'
        ];
        //style={{ flexDirection: 'row' }}
        return (
            <ScrollView>
                <Text style={{ fontSize: 22, marginBottom: 12 }}>Сертификация гидрокостюма</Text>
                {words.map((w, i) => (
                    <View>
                        <Text>{w}</Text>
                        <Checkbox isChecked={!!state.checkboxes[i]} />
                    </View>
                ))}
                <Text>Дата сертификации (сегодня): {dateFormatter(new Date())}</Text>
                <Text> DatePicker </Text>
                <Input style={{ width: 200 }} placeholder="Комментарий к проверке" />
            </ScrollView>
        );
    }
}