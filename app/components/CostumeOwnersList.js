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
}

export default class CostumeOwnersList extends Component {
    state = {
        owners: [],
        searchWord: '',
    }

    pickOwners = () => {
        this.setState({
            owners: store.getSuitableOwners(this.state.searchWord)
        });
    }

    onSearchWordChange = word => {
        this.setState({
            searchWord: word,
            owners: store.getSuitableOwners(word)
        });
    }

    componentWillMount() {
        this.pickOwners();

        store.addChangeListener(this.pickOwners);
    }

    render() {
        const props: PropsType = this.props;

        const renderOwner = ((o, i) => {
            return (
                <View key={i} style={styles.table}>
                    <Text style={styles.td}>{o.name}</Text>
                    <Text style={styles.td}>{o.size}</Text>
                </View>
            )
        })

        const owners = this.state.owners.map(renderOwner);
        const searchWord = this.state.searchWord;

        return (
            <ScrollView style={{ padding: 15 }}>
                <Text></Text>
                <Input
                    onChange={this.onSearchWordChange}
                    text={searchWord}
                />
                <View style={{ marginBottom: 15 }}>
                    <Button onClick={props.onBackButtonPressed} text="Вернуться к списку гидрокостюмов" />
                </View>

                <View style={styles.table}>
                    <Text style={styles.td}>ФИО</Text>
                    <Text style={styles.td}>Размер</Text>
                </View>
                {owners}
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
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 15
  },
  table: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  td: {
    padding: 10,
    width: 300
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
