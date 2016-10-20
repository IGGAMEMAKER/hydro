import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Button from './basic/Button';
import Input from './basic/TextInput';
import actions from '../actions/CostumeActions';

const MODE_SWITCH_OWNER = 'MODE_SWITCH_OWNER';
const MODE_CERTIFICATION = 'MODE_CERTIFICATION';

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
                    <View style={{marginBottom: 15}}>
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

    render() {
        const props = this.props;
        const state = this.state;

        const formatDate = this.formatDate;

        return (
            <View>
                <View style={styles.center}>
                    <Text style={styles.center}>Гидрокостюм №{props.id} </Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Размер: </Text>
                    <Text style={styles.text}>{props.data.size}</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.label}>Местоположение: </Text>
                    <Text style={styles.text}>{props.data.location}</Text>
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


                <Text>{props.id}</Text>
                <Button
                    onClick={props.onBackButtonPressed}
                    text="Вернуться к списку гидрокостюмов"
                ></Button>
            </View>
        );
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
        width: 400,
//        flex: 1, flexDirection: 'row',
        fontSize: 16,
        height: 22
//        justifyContent: 'left'
    },
    minorButton: {
        height: 20,
        width: 350,
        marginRight: 25
    }
})
