import React, { Component } from 'react';

import {
  StyleSheet,
//  Text
} from 'react-native';

import * as ReactNative from 'react-native';
const Input = ReactNative.TextInput;
//type PropsType = {
//    placeholder: String,
//    text: String,
//    onChange: Function
//}

export default class TextInput extends Component {
  render() {
    const props = this.props;
    console.log('Extended Class TextInput');

    // props
    // text: String
    // placeholder: String

    return (
        <Input
            placeholder={props.placeholder}
            style={{ height: 40, width: 140 }}
        >{props.text}
        </Input>
    )
  }
}