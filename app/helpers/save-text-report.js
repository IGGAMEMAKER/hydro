var RNFS = require('react-native-fs');

var path = '/sdcard/download/report.txt';

const printer = (success) => {
    console.log('REPORT WRITTEN!', success);
    return success;
}

const errorHandler = (err) => {
    console.log('save-text-report.js', err.message);
}

module.exports = {
    save: (report) => {
//        const dateString = new Date();
//        const dateString = '';
//        return RNFS.writeFile(`/sdcard/download/report ${dateString}.txt`, report, 'utf8')
        return RNFS.writeFile(path, report, 'utf8')
            .then(printer)
            .catch(errorHandler);
    },
    read: () => {
        return RNFS.readFile(path, 'utf8')
            .then(file => {
//                console.log('read backup', file);
                return file;
            })
    }
}
