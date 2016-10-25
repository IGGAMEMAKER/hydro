var RNFS = require('react-native-fs');

//var path = RNFS.DocumentDirectoryPath + '/URGE-BURGE-GURGE-test.txt';
//var path = '/sdcard/URGE-BURGE-GURGE-test.txt';
var path = '/sdcard/URGE-BURGE-GURGE-test.csv';
var backupPath = '/sdcard/download/hydro-costumes-backup.js';

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
    write: () => {
        const text = 'Item,Cost,Sold,Profit CLRF Keyboard,$10.00,$16.00,$6.00, CLRF Monitor,$80.00,$120.00,$40.00 CLRF Mouse,$5.00,$7.00,$2.00 CLRF ,,Total,$48.00';
//        const text = 'Lorem ipsum dolor sit amet';
        // write the file
        RNFS.writeFile(path, text, 'utf8')
          .then(printer)
          .catch(errorHandler);
    },
    makeBackup: (history, costumes) => {
        const obj = {
            date: new Date(),
            history,
            costumes,
        }

        RNFS.writeFile(backupPath, JSON.stringify(obj), 'utf8')
            .then(printer)
            .catch(errorHandler);
    },
    readFile,
    getFolderStructure: (p) => {
//        RNFS.read
    }
}
