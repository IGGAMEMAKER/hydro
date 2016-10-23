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
  ScrollView,
  ViewGroup,

  AsyncStorage
} from 'react-native';
var STORAGE_KEY = '@AsyncStorageExample:key';

import PDFCreator from './app/components/PDFCreator';

import TextInput from './app/components/basic/TextInput';
import Button from './app/components/basic/Button';

import actions from './app/actions/CostumeActions';
import store from './app/stores/CostumeStore';


//import Realm from 'realm';
//var SQLite = require('react-native-sqlite-storage')


import {
    MODE_INITIAL_TABLE_VIEW,
    MODE_COSTUME_EDITOR,
    MODE_COSTUME_ADDING,
    MODE_COSTUME_CERTIFY,
    MODE_COSTUME_CERTIFY_NO_EDITING,
} from './app/constants/constants';

import CostumeList from './app/components/CostumeList';
import CostumeView from './app/components/CostumeView';
import CostumeCertification from './app/components/CostumeCertification';
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
        this._loadInitialState().done();

        setTimeout(async () => {
            AsyncStorage.setItem(STORAGE_KEY, 'OLOLOLO');
        }, 0);
    }

      _loadInitialState = async () => {
        try {
          var value = await AsyncStorage.getItem(STORAGE_KEY);
          if (value !== null){
            this.setState({ value });
            this._appendMessage('Recovered selection from disk: ' + value);
          } else {
            this._appendMessage('Initialized with no selection on disk.');
          }
        } catch (error) {
          this._appendMessage('AsyncStorage error: ' + error.message);
        }
      };

    _appendMessage = message => {
        console.log('_appendMessage', message);
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
    backToCostumeEditor = () => {
        this.setState({
            mode: MODE_COSTUME_EDITOR,
//            selectedCostumeId: null
        });
    }

    toCertificationMenu = (id) => {
        this.setState({
            mode: MODE_COSTUME_CERTIFY,
            selectedCostumeId: id
        })
    }
    toCertificationWithNoEditing = (id) => {
        this.setState({
            mode: MODE_COSTUME_CERTIFY_NO_EDITING,
            selectedCostumeId: id
        })
    }

    addCostume = (costume, id) => {
        actions.addCostume(costume, id);

        this.backToMainMenu();
    }

    render() {
        const state = this.state;

        const costumes = this.getCostumes();

        const id = state.selectedCostumeId;


//        let realm = new Realm({
//            schema: [{name: 'Dog', properties: {name: 'string'}}]
//        });
//
//        realm.write(() => {
//            realm.create('Dog', {name: 'Rex'});
//        });

//                    <PDFCreator />
        if (state.mode === MODE_INITIAL_TABLE_VIEW) {
            return (
                <ScrollView style={{ width: 500, height: 1000, marginLeft: 150 }}>
                    <Text> TTTT </Text>
                    <View style={styles.container}>
                           <Text style={styles.welcome}>
                             Count of Dogs in Realm: {"realm.objects('Dog').length"}
                           </Text>
                    </View>
                    <CostumeList
                        costumes={costumes}
                        onChooseCostume={this.selectCostume}
                        onDisplayNewCostumeForm={this.displayNewCostumeForm}
                    />
                </ScrollView>
            );
        }

        if (state.mode === MODE_COSTUME_EDITOR) {
            return (
                <CostumeView
                    id={id}
                    data={this.getCostumeById(id)}
                    onBackButtonPressed={this.backToMainMenu}
                    onCertificationButtonPressed={() => { this.toCertificationMenu(id); }}
                    onWatchCertification={() => { this.toCertificationWithNoEditing(id) }}
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

        if (state.mode === MODE_COSTUME_CERTIFY) {
            return (
                <CostumeCertification
                    id={id}
                    onBackButtonPressed={this.backToMainMenu}
                    onSubmitCertification={this.backToCostumeEditor}
                    editable
                />
            );
        }
        if (state.mode === MODE_COSTUME_CERTIFY_NO_EDITING) {
            return (
                <CostumeCertification
                    id={id}
                    onBackButtonPressed={this.backToMainMenu}
                    onSubmitCertification={this.backToCostumeEditor}
                    costume={this.getCostumeById(id)}
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
