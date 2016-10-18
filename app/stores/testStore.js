import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';

const CHANGE_EVENT = 'CHANGE_EVENT';

const baseValue = 1;

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

  getTestValue() {
    return baseValue;
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
    case '111':
        baseValue = baseValue * 2;
        console.log('testStore.js Dispatcher.register', p)
        store.emitChange();
      break;
    default:
        console.log('testStore.js Dispatcher.register worked, but no Payload Type', p)
      break;
  }
});

export default store;
