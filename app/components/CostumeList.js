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

        const costumeList = Object.keys(props.costumes).map((key, i) => {
            const owner = props.costumes[key].owner;
            const isFree = !owner;

            const style = isFree ? { color: 'green' }: {};
            const text = isFree ? 'Свободен': `Владелец: ${owner}`;

            const onChooseCostume = () => { props.onChooseCostume(key) };

            return (
                <View key={i}>
                    <Text>№ {key}</Text>
                    <Text style={style}>{text}</Text>
                    <Button onClick={onChooseCostume} text="Подробнее" />
                </View>
            );
        }).reverse();

        let array = [];
        for (let i=0; i< 3000; i++) {
            array.push(`Троцкий Лев${i} Давидович`);
        }
        const familyNames = array; //['oqiwd0as1'].fill('oqiwd0as', 0, 3000).map((s, i) => `${s}${i}`);

//        const matching = familyNames.filter(s => s.includes('oqiwd0as2900'));
        const matching = familyNames.filter(s => s.includes('Лев2'));
        return (
            <ScrollView style={{ padding: 15 }}>
                <Text>{JSON.stringify(matching)}</Text>
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
//    backgroundColor: '#F5FCFF',
    backgroundColor: 'black',
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
