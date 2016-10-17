import Dispatcher from '../dispatcher';

export default {
    test: () => {
        console.log('testAction test()');
        Dispatcher.dispatch({
            type: '111',
            data: {
                msg: 'ololo'
            }
        })
    }
}