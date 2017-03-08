import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

import backup from '../helpers/backup';

const CHANGE_EVENT = 'CHANGE_EVENT';

import {
  AsyncStorage
} from 'react-native';

var STORAGE_KEY = '@AsyncStorageExample:key';
var STORAGE_COSTUMES = '@STORAGE_COSTUMES';
var STORAGE_COSTUME_OWNERS = '@STORAGE_COSTUME_OWNERS';
var STORAGE_HISTORY = '@STORAGE_HISTORY';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_COSTUME_REMOVE,

    DISPATCHER_FLUSH_COSTUME_OWNER,
    DISPATCHER_SWITCH_COSTUME_OWNER,
    DISPATCHER_SWITCH_COSTUME_SIZE,
    DISPATCHER_SWITCH_COSTUME_LOCATION,
    DISPATCHER_SWITCH_COSTUME_COMPOSITION,
    DISPATCHER_COSTUME_WASH_INSIDE,
    DISPATCHER_COSTUME_DISINFECT,
    DISPATCHER_COSTUME_REPAIR,
    DISPATCHER_COSTUME_CERTIFICATION,
    DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION,

    DISPATCHER_IMPORT_DB
} from '../constants/constants';

let _costumes = {
    '123': {
         size: 'XL',
         owner: 'Михалыч',
         companyOwner: 'ООО Лукоморье',
         wasWashedInside: new Date(2000, 2, 10),
         location: 'на сертификации (г.Архангельск)',
         wasCertifiedDate: new Date(2001, 2, 10),
         isCertifiedTillDate: new Date(2002, 2, 10),
         certification: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         history: [],
         disinfectionDate: new Date(1998, 2, 4),
         repairDate: new Date(1999, 2, 4),
    },
    '120': {
         size: 'XXXL',
         owner: 'Петрович',
         companyOwner: 'ООО Лукоморье',
         wasWashedInside: new Date(2007, 2, 1),
         location: 'на сертификации (г.Архангельск)',
         wasCertifiedDate: new Date(2004, 2, 10),
         isCertifiedTillDate: new Date(2005, 2, 10),
         certification: [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1],
         history: [],
         disinfectionDate: new Date(2008, 2, 4),
         repairDate: new Date(2009, 5, 14)

    }
}

let _history = [];

let _costumeOwners = [];

class CostumeStore extends EventEmitter {
  addChangeListener(c: Function) {
    this.addListener(CHANGE_EVENT, c);
  }

  removeChangeListener(c: Function) {
    this.removeListener(CHANGE_EVENT, c);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCostumes() {
    return _costumes;
  }

  getHistory() {
    return _history;
  }

  getSuitableOwners(word) {
//    let owners = [
//        { name: 'Mikhalich', size: 'S' },
//        { name: 'Palich', size: 'XXL' },
//        { name: 'Nikitich', size: 'MW' },
//        { name: 'Petrovich', size: 'SW' }
//    ];

//    for (let i=0; i< 1000; i++) {
////        owners.push({ name: owners[i % 4].name, size: 'S' });
//        owners.push({ name: `Palich${i}`, size: 'S' });
//    }
    computeCostumeOwners();
    let owners = _costumeOwners;

    if (!word) {
        return owners;
    } else {
        const search = word.toLowerCase();
        return owners.filter(o => o.name.toLowerCase().includes(search));
    }
  }
}

const store: CostumeStore = new CostumeStore();

type PayloadType = {
  type: string,
  token: ?string,
  error: ?Object
}

const recordToHistory = async (id, tag, data) => {
    _costumes[id].history.push({ tag, data });

    _history.push({ id, tag, data, date: new Date() });

    updateDB();
}

const updateDB = async () => {
    // rewrite to AsyncStorage
    // _costumes and _history

//    console.log('updateDB', STORAGE_HISTORY, _history, _costumes);
    await AsyncStorage.setItem(STORAGE_HISTORY, JSON.stringify(_history));
    await AsyncStorage.setItem(STORAGE_COSTUMES, JSON.stringify(_costumes));
    await AsyncStorage.setItem(STORAGE_COSTUME_OWNERS, JSON.stringify(_costumeOwners));

    reload();
}

const reload = (time) => {
//    this.setTimeout(() => { store.emitChange() }, time || 1000);
}

const _appendMessage = message => {
//    console.log('_appendMessage', message);
}

const computeCostumeOwners = () => {
    const listObject = {};
    _history
        .filter(h => h.tag === DISPATCHER_SWITCH_COSTUME_OWNER)
        .map(h => {
            const id = h.id;
            const c = _costumes[id];
            if (!c) {
                return { size: 'error', name: 'error' };
            }

            const size = c.size;
            const name = h.data.owner;

            const obj = { size: size, name: name };
            listObject[name + ':' + size] = obj;
            return obj;
        })
    _costumeOwners = Object.values(listObject);
}

const loadDataFromDB = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_COSTUMES);
      if (value !== null) {
        _costumes = JSON.parse(value);
        _appendMessage('Recovered STORAGE_COSTUMES from disk: ' + value);
      } else {
        _appendMessage('Initialized with no STORAGE_COSTUMES on disk.');
      }
    } catch (error) {
      _appendMessage('AsyncStorage STORAGE_COSTUMES error: ' + error.message);
    }

    try {
      value = await AsyncStorage.getItem(STORAGE_HISTORY);
      if (value !== null){
        _history = JSON.parse(value);
        _appendMessage('Recovered STORAGE_HISTORY from disk: ' + value);
      } else {
        _appendMessage('Initialized with no STORAGE_HISTORY on disk.');
      }
    } catch (error) {
      _appendMessage('AsyncStorage STORAGE_HISTORY error: ' + error.message);
    }

    computeCostumeOwners();
    store.emitChange();
}

const initialize = async () => {
    // load data from async storage to
    // _costumes and _history variables
    loadDataFromDB().done();
}

//const saveToFile = () => {
//    // write _costumes and _history to /sdcard/download/hydro-backup.js
//    backup.make(_history, _costumes).then(result => { console.log('saveToFile', result); loadFromFile() });
//}

//const loadFromFile = () => {
//    // read costumes and h from /sdcard/download/hydro-backup.js
//    // and write to _costumes and _history
//
//    backup.read()
//    .then(file => {
//
//    })
//}

initialize();

Dispatcher.register((p: PayloadType) => {
  switch (p.type) {
    case DISPATCHER_IMPORT_DB:
        const file = JSON.parse(p.file);

        _costumes = file.costumes;
        _history = file.history;

        updateDB();
        this.setTimeout(() => {

            store.emitChange();
        }, 5000);
        break;
    case DISPATCHER_COSTUME_ADD:
        const costume = p.costume;
        console.log('new costume CostumeStore.js', costume);

        _costumes[p.id] = Object.assign({}, costume);

        updateDB();
        store.emitChange();
        break;
    case DISPATCHER_COSTUME_REMOVE:
        _costumes[p.id].invisible = true;

        updateDB();
        store.emitChange();
        break;
    case DISPATCHER_SWITCH_COSTUME_OWNER:
        _costumes[p.id].owner = p.owner;
        _costumes[p.id].companyOwner = p.companyOwner;

        recordToHistory(p.id, DISPATCHER_SWITCH_COSTUME_OWNER, {
            owner: p.owner, companyOwner: p.companyOwner, date: new Date()
        })
        store.emitChange();
        break;
    case DISPATCHER_FLUSH_COSTUME_OWNER:
        _costumes[p.id].owner = null;
        _costumes[p.id].companyOwner = null;

        recordToHistory(p.id, DISPATCHER_FLUSH_COSTUME_OWNER, { date: new Date() })
        store.emitChange();
        break;
    case DISPATCHER_COSTUME_WASH_INSIDE:
        _costumes[p.id].wasWashedInside = new Date();

        recordToHistory(p.id, DISPATCHER_COSTUME_WASH_INSIDE, { date: new Date() })
        store.emitChange();
        break;
    case DISPATCHER_COSTUME_REPAIR:
        _costumes[p.id].repairDate = new Date();

        recordToHistory(p.id, DISPATCHER_COSTUME_REPAIR, { date: new Date() })
        store.emitChange();
        break;
    case DISPATCHER_COSTUME_DISINFECT:
        _costumes[p.id].disinfectionDate = new Date();

        recordToHistory(p.id, DISPATCHER_COSTUME_DISINFECT, { date: new Date() })
        store.emitChange();
        break;
    case DISPATCHER_SWITCH_COSTUME_COMPOSITION:
        _costumes[p.id].composition = p.composition;

        recordToHistory(p.id, DISPATCHER_SWITCH_COSTUME_COMPOSITION, {
            composition: p.composition, date: new Date()
        })
        store.emitChange();
        break;
    case DISPATCHER_SWITCH_COSTUME_SIZE:
        if (_costumes[p.id].size !== p.size) {
            _costumes[p.id].size = p.size;

            store.emitChange();
        }
        break;
    case DISPATCHER_SWITCH_COSTUME_LOCATION:
        if (_costumes[p.id].location !== p.location) {
            _costumes[p.id].location = p.location;

            recordToHistory(p.id, DISPATCHER_SWITCH_COSTUME_LOCATION, {
                location: p.location, date: new Date()
            })
            store.emitChange();
        }
        break;
    case DISPATCHER_COSTUME_CERTIFICATION: // it is not certification no more. It is techCheck
        _costumes[p.id].certification = p.checkboxes;
        _costumes[p.id].certificationDate = new Date();

        recordToHistory(p.id, DISPATCHER_COSTUME_CERTIFICATION, {
            certification: p.checkboxes,
            date: new Date(),
        })
        store.emitChange();
        break;
    case DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION:
        _costumes[p.id].wasCertifiedDate = new Date();
        _costumes[p.id].isCertifiedTillDate = p.date;

        recordToHistory(p.id, DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION, {
            certification: p.checkboxes,
            date: new Date(),
            expires: p.date
        })
        store.emitChange();
        break;
    default:
        console.log('costumeStore.js Dispatcher.register worked, but no Payload Type', p)
      break;
  }
});

export default store;
