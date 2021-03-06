import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import Button from './basic/Button';
import Select from './basic/Select';
import Input from './basic/TextInput';
import DatePicker from './basic/DatePicker';
import actions from '../actions/CostumeActions';

const MODE_SWITCH_OWNER = 'MODE_SWITCH_OWNER';
const MODE_CERTIFICATION = 'MODE_CERTIFICATION';
const MODE_EDIT_COMPOSITION = 'MODE_EDIT_COMPOSITION';

import dateFormatter from '../helpers/date-formatter';
import historyRecordPhrase from '../helpers/history-record-phrase';
import { clothSizes } from '../helpers/cloth-sizes';

export default class CostumeView extends Component {
    state = {
        mode: null,
        changes: {},
    }

    isCertificationProcessStarted = () => {
        return this.state.mode === MODE_CERTIFICATION;
    }

    isOwnerSwitchingMode = () => {
        return this.state.mode === MODE_SWITCH_OWNER;
    }
    switchOwner = () => {
        this.setState({
            mode: MODE_SWITCH_OWNER,
            changes: {
                owner: this.props.data.owner,
                companyOwner: this.props.data.companyOwner,
            }
        });
    }

    flushOwner = () => {
        actions.flushCostumeOwner(this.props.id);

        this.disableEditing();
    }

    onOwnerSwitch = (value) => {
        const changes = this.state.changes;
        changes['owner'] = value;
        this.setState({ changes });
    }
    onCompanyOwnerSwitch = (value) => {
        const changes = this.state.changes;
        changes['companyOwner'] = value;
        this.setState({ changes });
    }

    saveChangesOwner = () => {
        const changes = this.state.changes;
        actions.switchCostumeOwner(this.props.id, changes.owner, changes.companyOwner);

        this.disableEditing();
    }

    rejectChangesOwner = () => {
        this.setState({
            mode: null,
            changes: {}
        });
    }

    washInsides = () => {
        actions.washInsides(this.props.id);

        this.disableEditing();
    }

    disableEditing = () => { this.setState({ mode: null }) }

    renderOwnerSwitchingForm = (props, state) => {
        if (this.isOwnerSwitchingMode()) {
            return (
                <View style={{}}>
                    <Text>ФИО владельца</Text>
                    <Input
                        text={props.data.owner}
                        onChange={this.onOwnerSwitch}
                    />
                    <Text>Компания</Text>
                    <Input
                        text={props.data.companyOwner}
                        onChange={this.onCompanyOwnerSwitch}
                    />
                    <View style={{ marginBottom: 15 }}>
                        <Button text="Сохранить изменения" onClick={this.saveChangesOwner} />
                    </View>
                    <Button text="Отменить изменения" onClick={this.rejectChangesOwner} />
                </View>
            );
        }
//style={{ height: 20, color: 'pomegranate', width: 150 }}
        return (
            <View style={{ flexDirection: 'row' }}>
                <Button
                    style={styles.minorButton}
                    onClick={this.switchOwner} text="Сменить владельца" />
                <Button
                    style={{ height: 20, width: 150 }}
                    onClick={this.flushOwner} text="Возврат костюма" />
            </View>
        );
    }

    formatDate = (date) => {
        return dateFormatter(date);
//
        const options = {
//          era: 'long',
          year: 'numeric',
//          month: 'long',
//          month: 'numeric',
//          day: 'numeric',
//          weekday: 'long',
          timezone: 'UTC',
//          hour: 'numeric',
//          minute: 'numeric',
//          second: 'numeric'
        };

        const dt = new Date(date);

        return `${dt.getDate()}.${dt.getMonth()+1}.${dt.getFullYear()}`;
        return date.toLocaleString("RU", options);
//        return JSON.stringify(date);
    }

    switchCostumeSize = (id) => {
        return (value) => {
            actions.switchCostumeSize(id, value);

            this.disableEditing();
        }
    }
    switchCostumeLocation = (id) => {
        return (value) => {
            actions.switchCostumeLocation(id, value);

            this.disableEditing();
        }
    }

    onCostumeCompositionChange = (text) => {
        const changes = this.state.changes;
        changes.composition = text;

        this.setState({
            mode: MODE_EDIT_COMPOSITION,
            changes
        });
    }

    saveCompositionText = id => () => {
        const value = this.state.changes.composition;
        actions.saveCompositionText(id, value);

        this.disableEditing();
    }

    disinfectCostume = () => {
        actions.disinfectCostume(this.props.id);
        this.disableEditing();
    }

    repairCostume = () => {
        actions.repairCostume(this.props.id);

        this.disableEditing();
    }

    onCertificationTillChanged = (date) => {
        console.log('onCertificationTillChanged', date);
        this.setState({
            mode: MODE_CERTIFICATION,
            changes: {
                date
            }
        });
    }

    saveCertificationExpirationDate = () => {
        actions.saveCertificationExpirationDate(this.props.id, this.state.changes.date);

        this.disableEditing();
    }

    renderMainInfo = (props) => {
        const costumeSizeOptions = clothSizes;
        //        costumeSizeOptions = [
        //            { label: 'SW', value: 'SW'},
        //            { label: 'MW', value: 'MW'},
        //            { label: 'S', value: 'S'},
        //            { label: 'M', value: 'M'},
        //            { label: 'L', value: 'L'},
        //            { label: 'XL', value: 'XL'},
        //            { label: 'XXL', value: 'XXL'},
        //            { label: 'XXXL', value: 'XXXL'},
        //            { label: 'XXXXL', value: 'XXXXL'},
        //        ];
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Размер: </Text>
                <View style={{ marginTop: -15 }}>
                    <Select
                        options={costumeSizeOptions}
                        selectedValue={props.data.size}
                        onChange={this.switchCostumeSize(props.id)}
                    />
                </View>
            </View>
        );
    }

    renderLocation = (props) => {
        const locationOptions = [
            { label: 'база ГНШ', value: 'база ГНШ'},
            { label: 'платформа МЛСП', value: 'платформа МЛСП'},
            { label: 'на сертификации (г.Архангельск)', value: 'на сертификации (г.Архангельск)'},
        ]
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Местоположение: </Text>
                <Text style={styles.text}>{props.data.location}</Text>
                <View style={{ marginTop: -15 }}>
                    <Select
                        options={locationOptions}
                        selectedValue={props.data.location}
                        onChange={this.switchCostumeLocation(props.id)}
                    />
                </View>
            </View>
        );
    }

    renderCompositionInfo = (props, state) => {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.label}>Комплектность: {props.data.composition}</Text>
                </View>
                <Input
                    placeholder="Укажите комплектность набора"
                    text={state.changes.composition? state.changes.composition: props.data.composition}
                    style={{ height: 50 }}
                    onChange={this.onCostumeCompositionChange}
                />
                <Button
                    style={styles.minorButton}
                    text="Сохранить комплектность"
                    onClick={this.saveCompositionText(props.id)}
                />
            </View>
        );
    }

    renderClickableActions = (props, formatDate) => {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.label}>Дата стирки внутренней подкладки: </Text>
                    <Text style={styles.text}>{formatDate(props.data.wasWashedInside)}</Text>
                </View>
                <Button style={styles.minorButton} text="Постирать сейчас" onClick={this.washInsides} />

                <View style={styles.container}>
                    <Text style={styles.label}>Дата дезинфекции: </Text>
                    <Text style={styles.text}>{formatDate(props.data.disinfectionDate)}</Text>
                </View>
                <Button style={styles.minorButton} text="Дезинфицировать" onClick={this.disinfectCostume} />

                <View style={styles.container}>
                    <Text style={styles.label}>Отремонтировано: </Text>
                    <Text style={styles.text}>{formatDate(props.data.repairDate)}</Text>
                </View>
                <Button style={styles.minorButton} text="Ремонтировать" onClick={this.repairCostume} />

            </View>
        );
    }

    renderCertificationTab = (props, formatDate) => {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.label}>Дата проведения сертификации: </Text>
                    <Text style={styles.text}>{formatDate(props.data.wasCertifiedDate)}</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Сертификация действительна до: </Text>
                    <Text style={styles.text}>{formatDate(props.data.isCertifiedTillDate)}</Text>
                </View>

                <View style={{}}>
                    <View>
                        <Text>Провести сертификацию </Text>
                    </View>
                    <DatePicker onChange={this.onCertificationTillChanged} />
                    <Button text="Провести сертификацию" onClick={this.saveCertificationExpirationDate} />
                </View>
            </View>
        );
    }

    renderDivider = () => {
        return (
            <View style={{ height: 3, backgroundColor: 'black', marginTop: 5, marginBottom: 5 }}>
            </View>
        );
    }

    renderCostumeInfo = () => {
        const props = this.props;
        const state = this.state;

        const formatDate = this.formatDate;

        return (
            <View>
                <Button
                    onClick={props.onBackButtonPressed}
                    text="Вернуться к списку гидрокостюмов"
                ></Button>
                <Text style={styles.columnLabel}>Общая информация</Text>
                {this.renderMainInfo(props)}

                {this.renderLocation(props)}

                <View style={styles.container}>
                    <Text style={styles.label}>Владелец: </Text>
                    <Text style={styles.text}>
                        {
                            props.data.owner?
                                `${props.data.owner} (${props.data.companyOwner || 'Компания не указана'})`
                                :
                                'Свободен'
                        }
                    </Text>
                </View>
                <View style={{ marginLeft: 25 }}>{this.renderOwnerSwitchingForm(props, state)}</View>

                {this.renderDivider()}

                {this.renderCompositionInfo(props, state)}
                {this.renderDivider()}

                {this.renderClickableActions(props, formatDate)}
                {this.renderDivider()}

                {this.renderCertificationTab(props, formatDate)}
                {this.renderDivider()}

                <Button style={styles.minorButton} text="Провести техосмотр" onClick={this.props.onCertificationButtonPressed} />
                <Button style={{ marginTop: 12, opacity: 0 }} text="Просмотреть результаты техосмотра" onClick={this.props.onWatchCertification} />

                <Button
                    onClick={props.onBackButtonPressed}
                    text="Вернуться к списку гидрокостюмов"
                ></Button>

                <View style={styles.offset}>
                    <Button
                        onClick={props.onDeleteCostumePressed}
                        text="Удалить гидрокостюм"
                    ></Button>
                </View>
            </View>
        );
    }

    getHistoryRecordPhrase = (record) => {
        return historyRecordPhrase(record);
    }

    renderHistoryRecordComponent = (record, i) => {
        return (
            <View style={{ marginBottom: 15 }} key={i}>
                <Text>{this.getHistoryRecordPhrase(record)}</Text>
            </View>
        );
    }

    renderCostumeHistory = (costume) => {
        return (
            <ScrollView style={{ marginBottom: 15 }}>
                <Text style={styles.columnLabel}>История гидрокостюма</Text>
                {costume.history.map(this.renderHistoryRecordComponent)}
            </ScrollView>
        );
        return <Text>costume history</Text>
    }

    render() {
        const props = this.props;
        // { borderRight: 2, borderStyle: 'solid', borderColor: 'black' }
        return (
            <ScrollView>
                <View style={styles.center}>
                    <Text style={styles.center}>Гидрокостюм №{props.id} </Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <View style={{ marginLeft: 15 }}>{this.renderCostumeInfo()}</View>
                    <View style={{ marginLeft: 15 }}>{this.renderCostumeHistory(props.data)}</View>
                </View>
            </ScrollView>
        )
    }
}
//<Text>{JSON.stringify(props.data)}</Text>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5
    },
    center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        height: 30,
    },
    label: {
//        width: 225,
//        justifyContent: 'left',
//        flex: 1, flexDirection: 'row',
        fontSize: 16,
        height: 22
    },
    text: {
//        width: 400,
//        flex: 1, flexDirection: 'row',
        fontSize: 16,
        height: 22
//        justifyContent: 'left'
    },
    minorButton: {
        height: 20,
        width: 350,
        marginRight: 25,
        marginBottom: 15
    },
    offset: {
        marginTop: 25,
        marginBottom: 15
    },

    columnLabel: {
        fontSize: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
