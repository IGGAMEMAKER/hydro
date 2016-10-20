import Dispatcher from '../dispatcher';

import {
    DISPATCHER_COSTUME_ADD
} from '../constants/constants';

export default {
    loadCostumes: () => {
        console.log('testAction test()');
        Dispatcher.dispatch({
            type: '111',
            data: {
                msg: 'ololo'
            }
        })
    },

    addCostume: (costume) => {
        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_ADD,
            costume
        })
    }
}