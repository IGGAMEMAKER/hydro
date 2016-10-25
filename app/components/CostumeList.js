import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ViewGroup,
  ScrollView,
} from 'react-native';

import Button from './basic/Button';
import Input from './basic/TextInput';

import actions from '../actions/CostumeActions';
import store from '../stores/CostumeStore';

type PropsType = {
    costumes: Array,
    onChooseCostume: Function,
    onDisplayNewCostumeForm: Function,
}

export default class CostumeList extends Component {
    render() {
        const props: PropsType = this.props;
        // {'\n'}
        const costumeList = Object.keys(props.costumes).map((key, i) => {
            const owner = props.costumes[key].owner;
            const isFree = !owner;
            return (
                <View key={i}>
                    <Text>№ {key}</Text>
                    <Text style={isFree? { color: 'green' }: {}}>
                        {isFree? 'Свободен': `Владелец: ${owner}`}
                    </Text>
                    <Button
                        onClick={() => { props.onChooseCostume(key) }}
                        text="Подробнее"
                    />
                </View>
            );
        });

        return (
            <ScrollView style={{ padding: 15 }}>
                <View style={{ marginBottom: 15 }}>
                    <Button onClick={props.onDisplayNewCostumeForm} text="Добавить новый гидрокостюм" />
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Button onClick={props.onReportModeSet} text="Создание отчёта" />
                </View>

                <Text style={styles.container}>Все костюмы</Text>
                {costumeList}

                <View style={{ marginBottom: 15, marginTop: 35 }}>
                    <Text>База данных приложения будет заполнена из файла /sdcard/download/hydro-backup.js </Text>
                    <Text> ОСТОРОЖНО, ДАННУЮ ОПЕРАЦИЮ НЕЛЬЗЯ ОТМЕНИТЬ </Text>
                    <Button onClick={actions.importDB} text="Импортировать базу данных" />
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text>База данных приложения будет сохранена в файл /sdcard/download/hydro-backup.js </Text>
                    <Button onClick={() => { actions.saveDB(store.getHistory(), props.costumes)}} text="Экспортировать базу данных" />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    textAlign: 'center',
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 15
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
