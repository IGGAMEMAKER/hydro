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
        let date = this.props.date? this.props.date: new Date();
        this.setState({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear })
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
        console.log('onDateChange DatePicker.js', this.state, this.props);
        this.props.onChange(new Date(year, month - 1, day));
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