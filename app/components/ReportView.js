import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import Input from './basic/TextInput';
import Button from './basic/Button';
import Select from './basic/Select';

import store from '../stores/CostumeStore';

import { blankSizeList } from '../helpers/cloth-sizes';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_SWITCH_COSTUME_OWNER,
    DISPATCHER_FLUSH_COSTUME_OWNER,
    DISPATCHER_COSTUME_WASH_INSIDE,
    DISPATCHER_SWITCH_COSTUME_SIZE,
    DISPATCHER_SWITCH_COSTUME_LOCATION,
    DISPATCHER_SWITCH_COSTUME_COMPOSITION,
    DISPATCHER_COSTUME_DISINFECT,
    DISPATCHER_COSTUME_REPAIR,
    DISPATCHER_COSTUME_CERTIFICATION
} from '../constants/constants';

export default class Report extends Component {
    state = {
        startDay: null,
        startMonth: null,
        startYear: null,

        finishDay: null,
        finishMonth: null,
        finishYear: null,

        data: [],
        costumes: {},
    }

    componentWillMount() {
        store.addChangeListener(this.updateData)
    }

    updateData = () => {
        this.setState({ data: store.getHistory(), costumes: store.getCostumes() });
    }

    renderDatePicker = () => {

    }

    getCostumeSizeById = (id) => {
        return this.state.costumes[id].size;
    }

    getCostumeIdList = () => {
        const list = {};
        Object.keys(this.state.costumes).forEach(id => { list[id] = 0 });

        return list;
    }

    reportByPeriod = () => {
        const history = this.state.data;

        const usages = history.filter(h => h.tag === DISPATCHER_SWITCH_COSTUME_OWNER);

        const usagesBySize = Object.assign({}, blankSizeList);
        const usagesById = this.getCostumeIdList(); // or {}

        usages.forEach(u => {
            const id = u.id;
            usagesBySize[this.getCostumeSizeById(id)]++
            usagesById[id]++;
        })

        return (
            <View>
                <Text>{JSON.stringify(usagesById)}</Text>
                <Text>{JSON.stringify(usagesBySize)}</Text>
            </View>
        )
    }

    reportSummary = () => {

    }
    render() {

        return (
            <ScrollView>
                <Button onClick={this.props.onBackButtonPressed} text="Назад" />
                <Text> Создание отчёта за определённый период </Text>
                {this.reportByPeriod()}
            </ScrollView>
        );
    }
}