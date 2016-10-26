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

import dateFormatter from '../helpers/date-formatter';

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
    DISPATCHER_COSTUME_CERTIFICATION,
    DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION
} from '../constants/constants';

const offset = {
    marginTop: 15
};

const title = {
    fontSize: 22,
    textAlign: 'center',
}

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

        this.updateData()
    }

    updateData = () => {
        this.setState({ data: store.getHistory(), costumes: store.getCostumes() });
    }

    renderDatePicker = () => {

    }

    getCostumeSizeById = (id) => {
        console.log('getCostumeSizeById')
        Object.keys(this.state.costumes).forEach(i => { console.log(i, ':', this.state.costumes[i].size) });
        return this.state.costumes[id].size;
    }

    getCostumeIdList = () => {
        const list = {};
        Object.keys(this.state.costumes).forEach(id => { list[id] = 0 });

        return list;
    }

    getBySizeAndId = (usages) => {
//        const usages = history.filter(filter);

        const usagesBySize = Object.assign({}, blankSizeList);
        const usagesById = this.getCostumeIdList(); // or {}

        usages.forEach(h => {
            const id = h.id;
            usagesBySize[this.getCostumeSizeById(id)]++
            usagesById[id]++;
        })

        return { bySize: usagesBySize, byId: usagesById };
    }

    getUserUsagesById = (history) => {
        const obj = {};
        history.forEach(h => {
            const id = h.id;
            const { owner, companyOwner } = h.data;
            const item = { owner, companyOwner };
            if (!obj[id]) {
                obj[id] = [item];
            } else {
                obj[id].push(item);
            }
        })

        return obj;
    }

    renderUserUsages = (userUsages) => {
        return Object.keys(userUsages).map(id => {
            const users = userUsages[id].map((u, i) => {
                    console.log('u', u, i);
                  return (
                      <Text key={i}>{u.owner} ({u.companyOwner})</Text>
                  )
              })
            return (
                <View>
                    <Text>{id}</Text>
                    <View style={{ marginLeft: 12 }}>
                        {users}
                    </View>
                </View>
            );
        })
    }
    reportByPeriod = () => {
        const history = this.state.data;

        const usages = this.getBySizeAndId(history.filter(h => h.tag === DISPATCHER_SWITCH_COSTUME_OWNER));
        const certified = this.getBySizeAndId(history.filter(h => h.tag === DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION));
        const repaired = this.getBySizeAndId(history.filter(h => h.tag === DISPATCHER_COSTUME_REPAIR));

        const washed = history.filter(h => h.tag === DISPATCHER_COSTUME_WASH_INSIDE);
        const disinfected = history.filter(h => h.tag === DISPATCHER_COSTUME_DISINFECT);
        const composed = history.filter(h => h.tag === DISPATCHER_SWITCH_COSTUME_COMPOSITION);

        const userUsages = this.getUserUsagesById(history.filter(h => h.tag === DISPATCHER_SWITCH_COSTUME_OWNER));
//        const usages = history.filter(h => h.tag === DISPATCHER_SWITCH_COSTUME_OWNER);

//        console.log('ReportView.js usages', usages, history);
//        const usagesBySize = Object.assign({}, blankSizeList);
//        const usagesById = this.getCostumeIdList(); // or {}
//        const usagesByUser = {};
//
//        usages.forEach(h => {
//            const id = h.id;
//            usagesBySize[this.getCostumeSizeById(id)]++
//            usagesById[id]++;
//        })
        ///                     <Text>{JSON.stringify(userUsages)}</Text>

        return (
            <View>
                <Text> Отчёт за период </Text>
                <Text> Использовано </Text>
                <Text>{JSON.stringify(usages.byId)}</Text>
                <Text>{JSON.stringify(usages.bySize)}</Text>
                <View style={{ marginLeft: 15 }}>
                    <Text> Использовано по фамилиям</Text>
                    {this.renderUserUsages(userUsages)}
                </View>

                <Text style={offset}> Сертифицировано </Text>
                <Text>{JSON.stringify(certified.byId)}</Text>
                <Text>{JSON.stringify(certified.bySize)}</Text>

                <Text style={offset}> Отремонтировано </Text>
                <Text>{JSON.stringify(repaired.byId)}</Text>
                <Text>{JSON.stringify(repaired.bySize)}</Text>

                <Text style={offset}> Постирано внутренней части </Text>
                <Text>{washed.length}</Text>

                <Text> Дезинфицировано </Text>
                <Text>{disinfected.length}</Text>
                <Text> Доукомплектовано в комплектность </Text>
                <Text>{composed.length}</Text>
            </View>
        )
    }
    getSummaryStatBySize = (costumes) => {
        const sizes = {};
        Object.keys(costumes).map(id => {
            const size = costumes[id].size;

            if (!sizes[size]) {
                sizes[size] = [id];
            } else {
                sizes[size].push(id);
            }

        })

        return sizes;
    }

    getSummaryByOwnersAndCompanyOwners = (history, costumes) => {
        const companies = {};
        const users = {};

        history
        .filter(h => h.tag === DISPATCHER_SWITCH_COSTUME_OWNER)
        .forEach(h => {
            const { companyOwner, owner } = h.data;
            const { date, id } = h;
            companyInfoItem = { owner, date, id, size: costumes[id].size }; // needs more data here! date and etc, size and costume number
            userInfoItem = { companyOwner, date, id, size: costumes[id].size }; // same as there

            // add info to companies list
            if (!companies[companyOwner]) {
                companies[companyOwner] = [companyInfoItem];
            } else {
                companies[companyOwner].push(companyInfoItem);
            }

            if (!users[owner]) {
                users[owner] = [userInfoItem];
            } else {
                users[owner].push(userInfoItem);
            }
        })

        return { users, companies };
    }

    renderSummaryByOwnersAndCompanyOwners = (history, costumes) => {
        const { users, companies } = this.getSummaryByOwnersAndCompanyOwners(history, costumes);

        return (
            <View>
                <Text>По ФИО</Text>
                <Text>{JSON.stringify(users)}</Text>
                <Text>По компаниям</Text>
                <Text>{JSON.stringify(companies)}</Text>
            </View>
        );
    }
    reportSummary = () => {
        const history = this.state.data;
        const costumes = this.state.costumes;

        const sizeStat = this.getSummaryStatBySize(costumes);

        return (
            <View>
                <Text>{JSON.stringify(sizeStat)}</Text>
                {this.renderSummaryByOwnersAndCompanyOwners(history, costumes)}
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                <Button onClick={this.props.onBackButtonPressed} text="Назад" />
                <Text style={title}> Создание отчёта за определённый период </Text>
                {this.reportByPeriod()}
                <Text style={title}> Суммарный Отчёт </Text>
                {this.reportSummary()}
            </ScrollView>
        );
    }
}