import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

const CHANGE_EVENT = 'CHANGE_EVENT';

import {
  AsyncStorage
} from 'react-native';

var STORAGE_KEY = '@AsyncStorageExample:key';
var STORAGE_COSTUMES = '@STORAGE_COSTUMES';
var STORAGE_HISTORY = '@STORAGE_HISTORY';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_SWITCH_COSTUME_OWNER,
    DISPATCHER_FLUSH_COSTUME_OWNER,
    DISPATCHER_COSTUME_WASH_INSIDE,
    DISPATCHER_SWITCH_COSTUME_SIZE,
    DISPATCHER_SWITCH_COSTUME_LOCATION,
    DISPATCHER_SWITCH_COSTUME_COMPOSITION,
    DISPATCHER_COSTUME_DISINFECT,
    DISPATCHER_COSTUME_REPAIR,
    DISPATCHER_COSTUME_CERTIFICATION,
    DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION
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
}

const store: CostumeStore = new CostumeStore();

type PayloadType = {
  type: string,
  token: ?string,
  error: ?Object
}

const recordToHistory = (id, tag, data) => {
    _costumes[id].history.push({ tag, data });

    _history.push({ id, tag, data, date: new Date() });

    saveToDB();
}

const saveToDB = async () => {
    // rewrite to AsyncStorage
    // _costumes and _history

    console.log('saveToDB', STORAGE_HISTORY, _history, _costumes);
    AsyncStorage.setItem(STORAGE_HISTORY, JSON.stringify(_history));
    AsyncStorage.setItem(STORAGE_COSTUMES, JSON.stringify(_costumes));

    reload();
}

const reload = (time) => {
//    this.setTimeout(() => { store.emitChange() }, time || 1000);
}

const _appendMessage = message => {
    console.log('_appendMessage', message);
}

const loadDataFromDB = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_COSTUMES);
      if (value !== null){
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

    store.emitChange();
}

const initialize = async () => {
    // load data from async storage to
    // _costumes and _history variables
    loadDataFromDB().done();
}

const saveToFile = () => {
    // write _costumes and _history to /sdcard/download/HydroBackup.js
}

const loadFromFile = () => {
    // read costumes and h from /sdcard/download/HydroBackup.js
    // and write to _costumes and _history
}

initialize();

Dispatcher.register((p: PayloadType) => {
  switch (p.type) {
    case DISPATCHER_COSTUME_ADD:
        const costume = p.costume;
        console.log('new costume CostumeStore.js', costume);

        _costumes[p.id] = Object.assign({}, costume);

        saveToDB();
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
