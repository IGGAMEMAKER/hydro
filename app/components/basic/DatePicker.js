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
        const date = this.props.date;
        if (date) {
            this.setState({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear })
        }
    }

    onDayChange = (value) => {
        this.setState({ day: value })
        this.onDateChange();
    }
    onMonthChange = (value) => {
        this.setState({ month: value })
        this.onDateChange();
    }
    onYearChange = (value) => {
        this.setState({ year: value })
        this.onDateChange();
    }

    onDateChange = () => {
        const { day, month, year } = this.state;
        this.props.onChange(new Date(year, month - 1, day));
    }
    render() {
        return (
            <View>
                <Input onChange={this.onYearChange} style={{ width: 200 }} placeholder="Год" />
                <Input onChange={this.onMonthChange} style={{ width: 200 }} placeholder="Месяц" />
                <Input onChange={this.onDayChange} style={{ width: 200 }} placeholder="День" />
            </View>
        );
    }
}