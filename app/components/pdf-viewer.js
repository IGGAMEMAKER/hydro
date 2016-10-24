//import React, {
//    Component
//} from 'react';
//
//import {
//    StyleSheet,
//    View,
//    WebView,
//    Text
//} from 'react-native';
//
//import HTMLView from 'react-native-htmlview';
//
//export default class PDF extends Component {
//    render(){
//        console.log('render react viewer');
//        const content = '<p><a href="http://jsdf.co">&hearts; nice job!</a><iframe src="https://www.mathworks.com/moler/random.pdf"></iframe></p>';
//        return (
//            <View>
//                <Text>qweqwe</Text>
//                <HTMLView
//                    content={content}
//                    stylesheet={styles}
//                />
//            </View>
//        );
//    }
//}
//var styles = StyleSheet.create({
//    a: {
//        fontWeight: '300',
//        color: '#FF3366', // pink links
//    },
//    pdf: {
//        flex:1
//    }
//});


var React = require('react')
var ReactNative = require('react-native')
var {Text, View, ListView, StyleSheet} = ReactNative

var HTMLView = require('react-native-htmlview')

var App = React.createClass({
  render() {
    var htmlContent = '<p><a href="http://jsdf.co">&hearts; nice job!</a><iframe src="https://www.mathworks.com/moler/random.pdf"></iframe></p>'
//    const content = '<p><a href="http://jsdf.co">&hearts; nice job!</a><iframe src="https://www.mathworks.com/moler/random.pdf"></iframe></p>';
    return (
      <HTMLView
        value={htmlContent}
        stylesheet={styles}
      />
    )
  }
})

var styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // pink links
  },
})

module.exports = App;