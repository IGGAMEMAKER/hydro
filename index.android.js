/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ViewGroup
} from 'react-native';
//  TextInput,

import TextInput from './app/components/basic/TextInput';
import Button from './app/components/basic/Button';

import TestAction from './app/actions/testAction';
import TestStore from './app/stores/testStore';

import {
    MODE_INITIAL_TABLE_VIEW,
    MODE_COSTUME_EDITOR,
} from './app/constants/constants';

import CostumeList from './app/components/CostumeList';
import CostumeView from './app/components/CostumeView';

export default class AwesomeProject extends Component {
    state = {
        count: 0,
        mode: MODE_INITIAL_TABLE_VIEW,
        selectedCostumeId: null,
    }

    componentWillMount() {
        console.log('componentWillMount');
        TestStore.addChangeListener(() => {
            this.setState({
                count: TestStore.getTestValue()
            })
        })
    }

    tickCounter = () => {
        TestAction.test();
    }

    getCostumes = () => {
        return {
           '123': {
               size: 2,
               owner: 'Михалыч',
               companyOwner: 'ООО Лукоморье',
               wasWashedInside: new Date(1, 2, 2000),
               location: 'участок 1'
           },
           '120': {
              size: 22,
              owner: 'Петрович',
              companyOwner: 'ООО Лукоморье',
              wasWashedInside: new Date(1, 2, 2007),
              location: 'участок 1'
           }
        }
    }

    getCostumeById = (id) => {
        const costumes = this.getCostumes();
        return costumes[id];
    }

    selectCostume = (id) => {
        this.setState({
            mode: MODE_COSTUME_EDITOR,
            selectedCostumeId: id
        });
    }

    render() {
        const state = this.state;

        const newCostume = {
           id: '124',
           size: 5,
           owner: null,
           companyOwner: null,
           wasWashedInside: new Date(1, 2, 2000),
           location: 'участок 2'
        }

        const costumes = this.getCostumes();

        if (state.mode === MODE_INITIAL_TABLE_VIEW) {
            return (
                <CostumeList
                    costumes={costumes}
                    onChooseCostume={this.selectCostume}
                />
            );
        }

        if (state.mode === MODE_COSTUME_EDITOR) {
            const id = state.selectedCostumeId;
            return (
                <CostumeView
                    id={id}
                    data={this.getCostumeById(id)}
                    onBackButtonPressed={() => {
                        this.setState({ mode: MODE_INITIAL_TABLE_VIEW, selectedCostumeId: null })
                    }}
                />
            );
        }

        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native! AZAZAZAAAAAAAAAAAAAA
            </Text>

            <Text>qqq</Text>

            <Text style={styles.instructions}>
              To get started, edit index.android.js
            </Text>
            <TextInput
                text="ololo"
                placeholder="Введите номер гидрокостюма"
            />
            <Button
                text="click"
                onClick={this.tickCounter}
            />
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{'\n'}
              Shake or press menu button for dev menu
              {this.state.count}
            </Text>
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
