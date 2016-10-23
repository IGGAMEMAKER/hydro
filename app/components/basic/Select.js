import React, { Component } from 'react';

import {
    View,
    Picker,
    Text
} from 'react-native';

//import DropDown from 'react-native-dropdown';
//import {
//    Select,
//    Option,
//    OptionList,
//    updatePosition
//} from 'react-native-dropdown';


export default class SelectComponent extends Component {
    render() {
        const props = this.props;
        const options = props.options.map((o, i) => <Picker.Item key={i} label={o.label} value={o.value} />)
//                    optionListRef={this._getOptionList.bind(this)}
//                    onSelect={this._canada.bind(this)}>

//        return <Text>Select</Text>

// { width: 100, height: 50 }
        return (
            <View style={{ width: 150, }}>
                <Picker
                    selectedValue={props.selectedValue}
                    onValueChange={props.onChange}
                    mode="dropdown"
                >
                    {options}
                </Picker>
            </View>
        );
//        return (
//            <View>
//                <Select
//                    width={250}
//                    ref="SELECT1"
//                    defaultValue="Select a Province in Canada ..."
//                >
//                    <Option>Alberta</Option>
//                    <Option>British Columbia</Option>
//                    <Option>Manitoba</Option>
//                    <Option>New Brunswick</Option>
//                    <Option>Newfoundland and Labrador</Option>
//                    <Option>Northwest Territories</Option>
//                    <Option>Nova Scotia</Option>
//                    <Option>Nunavut</Option>
//                    <Option>Ontario</Option>
//                    <Option>Prince Edward Island</Option>
//                    <Option>Quebec</Option>
//                    <Option>Saskatchewan</Option>
//                    <Option>Yukon</Option>
//                </Select>
//            </View>
//        );
    }
}