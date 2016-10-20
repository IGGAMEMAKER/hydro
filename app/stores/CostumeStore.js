import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

const CHANGE_EVENT = 'CHANGE_EVENT';

import {
    DISPATCHER_COSTUME_ADD
} from '../constants/constants';

const _costumes = {
    '123': {
         size: 2,
         owner: 'Михалыч',
         companyOwner: 'ООО Лукоморье',
         wasWashedInside: new Date(1, 2, 2000),
         location: 'участок 1'
    },
    '120': {
        size: 22,
        owner: 'Петрович',
        companyOwner: 'ООО Лукоморье',
        wasWashedInside: new Date(1, 2, 2007),
        location: 'участок 1'
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
        store.emitChange();
        break;
    default:
        console.log('costumeStore.js Dispatcher.register worked, but no Payload Type', p)
      break;
  }
});

export default store;
