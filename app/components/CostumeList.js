import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ViewGroup
} from 'react-native';

type PropsType = {
    costumes: Array
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
        const costumeList = props.costumes.map(c => (
            <View>
                <Text>{c.id}</Text>
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