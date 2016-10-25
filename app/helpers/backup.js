var RNFS = require('react-native-fs');

var path = '/sdcard/URGE-BURGE-GURGE-test.csv';
var backupPath = '/sdcard/download/hydro-backup.js';

const readFile = () => {
    RNFS.readFile(path, 'utf8')
        .then(file => {
            console.log('readFile', file);
        })
}

const printer = (success) => {
    console.log('FILE WRITTEN!', success);
    return success;
}

const errorHandler = (err) => {
    console.log(err.message);
}

module.exports = {
    make: (history, costumes) => {
        const obj = {
            date: new Date(),
            history,
            costumes,
        }

        return RNFS.writeFile(backupPath, JSON.stringify(obj), 'utf8')
            .then(printer)
            .catch(errorHandler);
    },
    read: () => {
        return RNFS.readFile(backupPath, 'utf8')
            .then(file => {
//                console.log('read backup', file);
                return file;
            })
    }
}
