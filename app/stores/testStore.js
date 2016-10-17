import { EventEmitter } from 'events';

const CHANGE_EVENT = 'CHANGE_EVENT';

export default class AbstractStore extends EventEmitter {
  addChangeListener(c: Function) {
    this.addListener(CHANGE_EVENT, c);
  }

  removeChangeListener(c: Function) {
    this.removeListener(CHANGE_EVENT, c);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}
