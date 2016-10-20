import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

const CHANGE_EVENT = 'CHANGE_EVENT';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_SWITCH_COSTUME_OWNER
} from '../constants/constants';

let _costumes = {
    '123': {
         size: 2,
         owner: 'Михалыч',
         companyOwner: 'ООО Лукоморье',
         wasWashedInside: new Date(2000, 2, 10),
         location: 'участок 1',
         wasCertifiedDate: new Date(2001, 2, 10),
         isCertifiedTillDate: new Date(2002, 2, 10),
    },
    '120': {
        size: 22,
        owner: 'Петрович',
        companyOwner: 'ООО Лукоморье',
        wasWashedInside: new Date(2007, 2, 1),
        location: 'участок 1',
        wasCertifiedDate: new Date(2004, 2, 10),
        isCertifiedTillDate: new Date(2005, 2, 10),
    }
}

class TestStore extends EventEmitter {
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
}

const store: TestStore = new TestStore();

type PayloadType = {
  type: string,
  token: ?string,
  error: ?Object
}

Dispatcher.register((p: PayloadType) => {
  switch (p.type) {
    case DISPATCHER_COSTUME_ADD:
        const costume = p.costume;
        console.log('new costume CostumeStore.js', costume);

        _costumes[p.id] = Object.assign({}, costume);
        store.emitChange();
        break;
    case DISPATCHER_SWITCH_COSTUME_OWNER:
        _costumes[p.id].owner = p.owner;
        _costumes[p.id].companyOwner = p.companyOwner;

        store.emitChange();
    default:
        console.log('costumeStore.js Dispatcher.register worked, but no Payload Type', p)
      break;
  }
});

export default store;
