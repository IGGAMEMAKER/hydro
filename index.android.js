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

import actions from './app/actions/CostumeActions';
import store from './app/stores/CostumeStore';

import {
    MODE_INITIAL_TABLE_VIEW,
    MODE_COSTUME_EDITOR,
    MODE_COSTUME_ADDING
} from './app/constants/constants';

import CostumeList from './app/components/CostumeList';
import CostumeView from './app/components/CostumeView';
import CostumeAddingForm from './app/components/CostumeAddingForm';

export default class AwesomeProject extends Component {
    state = {
        count: 0,
        mode: MODE_INITIAL_TABLE_VIEW,
        selectedCostumeId: null,
    }

    componentWillMount() {
        console.log('componentWillMount');
//        TestStore.addChangeListener(() => {
//            this.setState({
//                count: TestStore.getTestValue()
//            })
//        })
    }

    getCostumes = () => {
        return store.getCostumes();
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

    displayNewCostumeForm = () => {
        this.setState({
            mode: MODE_COSTUME_ADDING,
            selectedCostumeId: null
        });
    }

    backToMainMenu = () => {
        this.setState({
            mode: MODE_INITIAL_TABLE_VIEW,
            selectedCostumeId: null
        });
    }

    addCostume = (costume, id) => {
        actions.addCostume(costume, id);

        this.backToMainMenu();
    }

    render() {
        const state = this.state;

        const costumes = this.getCostumes();

        if (state.mode === MODE_INITIAL_TABLE_VIEW) {
            return (
                <CostumeList
                    costumes={costumes}
                    onChooseCostume={this.selectCostume}
                    onDisplayNewCostumeForm={this.displayNewCostumeForm}
                />
            );
        }

        if (state.mode === MODE_COSTUME_EDITOR) {
            const id = state.selectedCostumeId;
            return (
                <CostumeView
                    id={id}
                    data={this.getCostumeById(id)}
                    onBackButtonPressed={this.backToMainMenu}
                />
            );
        }

        if (state.mode === MODE_COSTUME_ADDING) {
            return (
                <CostumeAddingForm
                    onBackButtonPressed={this.backToMainMenu}
                    onAddCostumePressed={this.addCostume}
                />
            );
        }

        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native! AZAZAZAAAAAAAAAAAAAA
            </Text>
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
