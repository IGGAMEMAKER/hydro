import React, { Component } from 'react';

import {
    StyleSheet
} from 'react-native';
//import * as react from 'react-native';
import Button from 'react-native-button';
const Btn = Button;

type PropsType = {
    onClick: Function,
    text: String,
}
export default class ButtonMock extends Component {
    render() {
        const props: PropsType = this.props;
        return (
            <Button
                onPress={props.onClick}
                style={styles.primary}
            >
                {props.text}
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: 'powderblue',
        padding: 25,

        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 15,
        paddingTop: 15
    }
})
