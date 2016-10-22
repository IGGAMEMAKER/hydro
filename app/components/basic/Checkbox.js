import React, { Component } from 'react';

import {
    View
} from 'react-native';

import Select from './Select';

type PropsType = {
    isChecked: boolean
}

export default class CheckBox extends Component {
    render() {
        const props: PropsType = this.props;
        const options = [
            { label: 'Да', value: 'yes' },
            { label: 'Нет', value: 'no' },
        ];

        return (
            <View>
                <Select
                    options={options}
                    selectedValue={props.isChecked? 'yes' : 'no'}
                    onChange={(value) => { props.onChange(value === 'yes' ? 1 : 0); }}
                />
            </View>
        );
    }
}