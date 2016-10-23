import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    WebView
} from 'react-native';

//import PDFDocument from 'pdfkit';
//import blobStream from 'blob-stream';
//const doc = new PDFDocument();

//
//const stream = doc.pipe(blobStream());
//
//// draw some text
//doc.fontSize(25)
//   .text('Here is some vector graphics...', 100, 80);
//
//// some vector graphics
//doc.save()
//   .moveTo(100, 150)
//   .lineTo(100, 250)
//   .lineTo(200, 250)
//   .fill("#FF3300");
//
//doc.circle(280, 200, 50)
//   .fill("#6600FF");
//
//// an SVG path
//doc.scale(0.6)
//   .translate(470, 130)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();
//
//// and some justified text wrapped into columns
//doc.text('And here is some wrapped text...', 100, 300)
//   .font('Times-Roman', 13)
//   .moveDown()
//   .text(lorem, {
//     width: 412,
//     align: 'justify',
//     indent: 30,
//     columns: 2,
//     height: 300,
//     ellipsis: true
//   });
//
//// end and display the document in the iframe to the right
//doc.end();

//import Iframe from "react-iframe";
export default class PDF extends Component {
    state = {
//        url: '',
//        url: 'https://www.mathworks.com/moler/random.pdf',
        url: 'https://github.com/facebook/react-native',
    }
    componentWillMount() {
//        stream.on('finish', () => {
//            const url = stream.toBlobURL('application/pdf');
//
//            console.log('stream on finish PDFCreator.js', url);
////          iframe.src = stream.toBlobURL('application/pdf');
//          this.setState({ url })
//        });
    }

    render() {
        return (
            <WebView source={{ uri: this.state.url }} style={{ width:400, height: 100}} />
        );
    }
}



//
//'use strict';
//
//import React,{
//    Component
//} from 'react';
//
//import {
//    StyleSheet,
//    View
//} from 'react-native';
//
//import PDFView from 'react-native-pdf-view';
//
//export default class PDF extends Component {
//    constructor(props) {
//        super(props);
//    }
//
////                         src={"sdcard/pdffile.pdf"}
//    render(){
//        return (
//            <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
//                path={'https://www.mathworks.com/moler/random.pdf'}
//                onLoadComplete = {(pageCount) => {
//                    this.pdfView.setNativeProps({
//                        zoom: 1.5
//                    });
//                }}
//                style={styles.pdf}
//            />
//        );
//    }
//}
//var styles = StyleSheet.create({
//    pdf: {
//        flex:1
//    }
//});


//var React = require('react-native');
//import React,{
//    Component
//} from 'react';
////
//import {
//    StyleSheet,
//    View,
//    AlertIOS,
//    AppRegistry,
////    StyleSheet,
//    Text,
//    TouchableHighlight,
////    View,
//} from 'react-native';
//var {
//  AlertIOS,
//  AppRegistry,
//  StyleSheet,
//  Text,
//  TouchableHighlight,
//  View,
//} = React;

//import RNHTMLtoPDF from 'react-native-html-to-pdf';
//
//export default class PDF extends Component {
//
//  createPDF() {
//    var options1 = {
//      html: '<h1>PDF TEST</h1>', // HTML String
//
////      ****************** OPTIONS BELOW WILL NOT WORK ON ANDROID **************
//      fileName: 'test',          /* Optional: Custom Filename excluded extention
//                                    Default: Randomly generated
//                                  */
//
//
//      directory: 'docs',          /* Optional: 'docs' will save the file in the `Documents`
//                                    Default: Temp directory
//                                  */
//
//      height: 800,                /* Optional: 800 sets the height of the DOCUMENT that will be produced
//                                    Default: 612
//                                  */
//      width: 1056 ,               /* Optional: 1056 sets the width of the DOCUMENT that will produced
//                                    Default: 792
//                                  */
//      padding: 24 ,                /* Optional: 24 is the # of pixels between the outer paper edge and
//                                            corresponding content edge.  Example: width of 1056 - 2*padding
//                                            => content width of 1008
//                                    Default: 10
//                                  */
//    };
//
//    var options = {
//        html: '<h1>PDF TEST</h1>',
//    }
//
//    RNHTMLtoPDF.convert(options).then((filePath) => {
//      console.log(filePath);
//    });
//  }
//
//  render = () => (
//    <View>
//      <TouchableHighlight onPress={this.createPDF}>
//        <Text>Create PDF</Text>
//      </TouchableHighlight>
//    </View>
//  )
//}