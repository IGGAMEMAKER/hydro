import React, { Component } from 'react';

import {
    View
} from 'react-native';

type PropsType = {
    onChange: Function,
    date: Date
}

import Input from './TextInput';

export default class DatePicker extends Component {
    state = {
        day: null,
        month: null,
        year: null
    }

    componentWillMount() {
//        let date = this.props.date? this.props.date: new Date();
        let date = new Date();
        this.setState({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() })
    }

    onDayChange = (value) => {
        this.onDateChange({ day: value });
    }
    onMonthChange = (value) => {
        this.onDateChange({ month: value });
    }
    onYearChange = (value) => {
        console.log('year changed', value);
        this.onDateChange({ year: value });
    }

    onDateChange = (change) => {
        const date = Object.assign({}, this.state, change);
        const { day, month, year } = date;
        console.log('onDateChange DatePicker.js', date);

        this.props.onChange(new Date(year, month - 1, day));
        this.setState(date);
    }
    render() {
        const style = { width: 200 };
        return (
            <View>
                <Input onChange={this.onYearChange} style={style} placeholder="Год" />
                <Input onChange={this.onMonthChange} style={style} placeholder="Месяц" />
                <Input onChange={this.onDayChange} style={style} placeholder="День" />
            </View>
        );
    }
}