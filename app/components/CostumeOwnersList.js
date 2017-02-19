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
    state = {
        owners: [],
        searchWord: '',
    }

    pickOwners = () => {
        this.setState({
            owners: store.getSuitableOwners(this.state.searchWord)
        });
    }
    componentWillMount() {
        this.pickOwners();

        store.addChangeListener(this.pickOwners);
    }
    render() {
        const props: PropsType = this.props;

        const renderOwner = ((o, i) => {
//        style={styles.container}
            return (
                <View key={i}>
                    <Text>{o.name} Размер: {o.size}</Text>
                </View>
            )
        })

        const owners = this.state.owners.map(renderOwner);
//        let array = [];
//        for (let i=0; i< 3000*0 + 1; i++) {
//            array.push(`Троцкий Лев${i} Давидович`);
//        }
//        const familyNames = array; //['oqiwd0as1'].fill('oqiwd0as', 0, 3000).map((s, i) => `${s}${i}`);

//        const matching = familyNames.filter(s => s.includes('oqiwd0as2900'));
//        const matching = familyNames;//.filter(s => s.includes('Лев2'));
//                <Text>{JSON.stringify(matching)}</Text>
//        return <Text>asdasd</Text>
        return (
            <ScrollView style={{ padding: 15 }}>
                <View style={{ marginBottom: 15 }}>
                    <Button onClick={props.onBackButtonPressed} text="Вернуться к списку гидрокостюмов" />
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
