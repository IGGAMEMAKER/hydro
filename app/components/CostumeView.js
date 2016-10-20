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

export default class CostumeView extends Component {
    state = {
        mode: null,
        changes: {},
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
                    <Button text="Сохранить изменения" onClick={this.saveChangesOwner} />
                </View>
            );
        }

        return <Button style={{ height: 20 }} onClick={this.switchOwner} text="Сменить владельца" />;
    }

    render() {
        const props = this.props;
        const state = this.state;

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
                    <Text style={styles.text}>{props.data.owner} ({props.data.companyOwner})</Text>
                </View>
                <View style={{ marginLeft: 25 }}>{this.renderOwnerSwitchingForm(props, state)}</View>

                <View style={styles.container}>
                    <Text style={styles.label}>Комплектность: </Text>
                    <Text style={styles.text}>{props.data.composition}</Text>
                </View>

                <Text>{JSON.stringify(props.data)}</Text>
                <Text>{props.id}</Text>
                <Button
                    onClick={props.onBackButtonPressed}
                    text="Вернуться к списку гидрокостюмов"
                ></Button>
            </View>
        );
    }
}

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
    }
})
