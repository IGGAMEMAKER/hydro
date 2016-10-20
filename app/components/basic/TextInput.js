import React, { Component } from 'react';

import {
  StyleSheet,
//  Text
} from 'react-native';

import * as ReactNative from 'react-native';
const Input = ReactNative.TextInput;
type PropsType = {
    placeholder: String,
    text: String,
    onChangeText: Function,
    style: ?Object,
    mergeStyles: boolean,
}

export default class TextInput extends Component {
  render() {
    const props: PropsType = this.props;

    let style = { height: 40, width: 140 };
    if (props.style) {
        style = props.mergeStyles? Object.assign(style, props.style): props.style;
    }
    // props
    // text: String
    // placeholder: String

    return (
        <Input
            placeholder={props.placeholder}
            style={style}
//            onChange={props.onChange}
            onChangeText={props.onChange}
        >{props.text}
        </Input>
    )
  }
}