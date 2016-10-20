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

type PropsType = {
    costumes: Array,
    onChooseCostume: Function,
    onDisplayNewCostumeForm: Function,
}

export default class CostumeList extends Component {
//    render() {
//        return (
//            <ViewGroup>
//            </ViewGroup>
//        );
//    }
    render() {
        const props: PropsType = this.props;
        // {'\n'}
        const costumeList = Object.keys(props.costumes).map(key => {
            const owner = props.costumes[key].owner;
            const isFree = !owner;
            return (
                <View>
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
            <ScrollView>
                <Button onClick={props.onDisplayNewCostumeForm} text="Добавить новый гидрокостюм" />
                <Text style={styles.container}>Все костюмы</Text>
                {costumeList}
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