import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Button from './basic/Button';

export default class CostumeView extends Component {
    render() {
        const props = this.props;

        return (
            <View>
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
