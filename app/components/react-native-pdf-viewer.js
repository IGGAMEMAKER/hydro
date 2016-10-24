import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View,
    WebView
} from 'react-native';


//'use strict';
import PDFView from 'react-native-pdf-view';

export default class PDF extends Component {
    constructor(props) {
        super(props);
    }

//                         src={"sdcard/pdffile.pdf"}
//                path={"https://www.mathworks.com/moler/random.pdf"}
    render(){
        console.log('render react viewer');
        return (
            <PDFView
                ref={pdf => {this.pdfView = pdf;} }
                src={"/sdcard/pdffile.pdf"}
                onLoadComplete = {pageCount => {
                    console.log('onLoadPDF');
                    this.pdfView.setNativeProps({
                        zoom: 1.5
                    });
                }}
                style={styles.pdf}
            />
        );
    }
}
var styles = StyleSheet.create({
    pdf: {
        flex:1
    }
});