import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Button from './basic/Button';
import Select from './basic/Select';
import Input from './basic/TextInput';
import actions from '../actions/CostumeActions';

const MODE_SWITCH_OWNER = 'MODE_SWITCH_OWNER';
const MODE_CERTIFICATION = 'MODE_CERTIFICATION';
const MODE_EDIT_COMPOSITION = 'MODE_EDIT_COMPOSITION';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_SWITCH_COSTUME_OWNER,
    DISPATCHER_FLUSH_COSTUME_OWNER,
    DISPATCHER_COSTUME_WASH_INSIDE,
    DISPATCHER_SWITCH_COSTUME_SIZE,
    DISPATCHER_SWITCH_COSTUME_LOCATION,
    DISPATCHER_SWITCH_COSTUME_COMPOSITION
} from '../constants/constants';

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
        console.log('onOwnerSwitch', this.state.changes);
        const changes = this.state.changes;
        changes['owner'] = value;
        this.setState({ changes });
    }
    onCompanyOwnerSwitch = (value) => {
        console.log('onOwnerSwitch', this.state.changes);
        const changes = this.state.changes;
        changes['companyOwner'] = value;
        this.setState({ changes });
    }

    saveChangesOwner = () => {
        const changes = this.state.changes;
        console.log('saveChangesOwner CostumeView.js', changes);
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

    startCertificationProcess = () => {
        this.setState({
            mode: MODE_CERTIFICATION
        })
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

        return (
            <View style={{ flexDirection: 'row' }}>
                <Button
                    style={styles.minorButton}
                    onClick={this.switchOwner} text="Сменить владельца" />
                <Button
                    style={{ height: 20, color: 'pomegranate', width: 150 }}
                    onClick={this.flushOwner} text="Возврат костюма" />
            </View>
        );
    }

    formatDate = (date) => {
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

    saveCompositionText = (id) => {
        return (value) => {
            actions.saveCompositionText(id, value);

            this.disableEditing();
        }
    }

    renderCostumeInfo = () => {
        const props = this.props;
        const state = this.state;

        const formatDate = this.formatDate;

        costumeSizeOptions = [
            { label: 'm', value: 'm'},
            { label: 'l', value: 'l'},
            { label: 's', value: 's'},
            { label: 'xl', value: 'xl'},
        ];

        locationOptions = [
            { label: 'участок 1', value: 'участок 1'},
            { label: 'участок 2', value: 'участок 2'},
            { label: 'участок 3', value: 'участок 3'},
        ]

        return (
            <View>
                <Text style={styles.columnLabel}>Общая информация</Text>
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

                <View style={styles.container}>
                    <Text style={styles.label}>Комплектность: </Text>
                    <Text style={styles.text}>{props.data.composition}</Text>
                    <Input
                        style={styles.text}
                        text={state.changes.composition? state.changes.composition : props.data.composition}
                        onChange={this.onCostumeCompositionChange}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Дата стирки внутренней подкладки: </Text>
                    <Text style={styles.text}>{formatDate(props.data.wasWashedInside)}</Text>
                </View>
                <Button style={styles.minorButton} text="Постирать сейчас" onClick={this.washInsides} />

                <View style={styles.container}>
                    <Text style={styles.label}>Дата проведения сертификации (тех. осмотра??): </Text>
                    <Text style={styles.text}>{formatDate(props.data.wasCertifiedDate)}</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Сертификация действительна до: </Text>
                    <Text style={styles.text}>{formatDate(props.data.isCertifiedTillDate)}</Text>
                </View>
                <Button style={styles.minorButton} text="Провести техосмотр" onClick={this.startCertificationProcess} />

                <Button
                    onClick={props.onBackButtonPressed}
                    text="Вернуться к списку гидрокостюмов"
                ></Button>
            </View>
        );
    }

    renderHistoryRecordComponent = (record) => {
        let text = '';
        switch (record.tag) {
            case DISPATCHER_SWITCH_COSTUME_OWNER:
                text = `Смена владельца: ${record.owner}`;
                break;
            case DISPATCHER_FLUSH_COSTUME_OWNER:
                text = `Возврат костюма`;
                break;
            case DISPATCHER_COSTUME_WASH_INSIDE:
                text = `DISPATCHER_COSTUME_WASH_INSIDE`;
                break;
            case DISPATCHER_SWITCH_COSTUME_SIZE:
                text = ``;
                break;
            case DISPATCHER_SWITCH_COSTUME_LOCATION:
                text = ``;
                break;
            case DISPATCHER_SWITCH_COSTUME_COMPOSITION:
                text = ``;
                break;
        }

        return (
            <View style={{ marginBottom: 15 }}>
                <Text>{text}</Text>
            </View>
        );
    }

    renderCostumeHistory = (costume) => {
        return (
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.columnLabel}>История гидрокостюма</Text>
                {costume.history.map(this.renderHistoryRecordComponent)}
            </View>
        );
        return <Text>costume history</Text>
    }

    render() {
        const props = this.props;
        // { borderRight: 2, borderStyle: 'solid', borderColor: 'black' }
        return (
            <View>
                <View style={styles.center}>
                    <Text style={styles.center}>Гидрокостюм №{props.id} </Text>
                </View>
                <View style={{ flexDirection: 'row'}}>
                    <View>{this.renderCostumeInfo()}</View>
                    <View>{this.renderCostumeHistory(props.data)}</View>
                </View>
            </View>
        )
    }
}
//<Text>{JSON.stringify(props.data)}</Text>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 12
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
        marginRight: 25
    },

    columnLabel: {
        fontSize: 20,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
    }
})
