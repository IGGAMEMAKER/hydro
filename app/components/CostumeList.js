import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ViewGroup
} from 'react-native';

import Button from './basic/Button';

type PropsType = {
    costumes: Array,
    onChooseCostume: Function,
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
        const costumeList = Object.keys(props.costumes).map(key => (
            <View>
                <Text>№ {key}</Text>
                <Button
                    onClick={() => { props.onChooseCostume(key) }}
                    text="Подробнее"
                />
            </View>
        ));

        return (
            <View>
                <Text>Все костюмы</Text>
                {costumeList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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