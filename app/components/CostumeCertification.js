import React, { Component } from 'react';

import {
    View,
    Text
} from 'react-native';

import Checkbox from './basic/Checkbox';

export default class CostumeCertification extends Component {
    state = {
        checkboxes: [0,0,0,0,0,0,0,0,0,0]
    }
    render() {
        return (
            <View>
                <Text>Отметить на сервисной карте серийный номер. </Text>
                <Checkbox isChecked />
                <Text>222</Text>
                <Checkbox />
            </View>
        );
    }
}