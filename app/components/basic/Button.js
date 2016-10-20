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
    action: boolean,
    style: Object,
}
export default class ButtonMock extends Component {
    render() {
        const props: PropsType = this.props;

        let style = {};

        if (props.action) {
            style = styles.action;
        } else {
            if (props.style) {
                style = props.style;
            } else {
                style = styles.primary;
            }
        }
        return (
            <Button
                onPress={props.onClick}
//                style={props.action ? styles.action : styles.primary}
                style={style}
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
    },
    action: {
        backgroundColor: 'tomato',
        color: 'white',
        padding: 25,

        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 15,
        paddingTop: 15
    },
    navigation: {
        backgroundColor: 'seagreen',
        color: 'white',
        padding: 25,

        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 15,
        paddingTop: 15
    }
})
