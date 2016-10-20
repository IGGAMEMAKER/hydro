import Dispatcher from '../dispatcher';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_SWITCH_COSTUME_OWNER,
    DISPATCHER_FLUSH_COSTUME_OWNER
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

    addCostume: (costume, id) => {
        console.log('CostumeActions.js addCostume', costume, id);

        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_ADD,
            costume,
            id
        })
    },

    switchCostumeOwner: (id, owner, companyOwner) => {
        Dispatcher.dispatch({
            type: DISPATCHER_SWITCH_COSTUME_OWNER,
            id,
            owner,
            companyOwner
        })
    },
    flushCostumeOwner: (id) => {
        Dispatcher.dispatch({
            type: DISPATCHER_FLUSH_COSTUME_OWNER,
            id
        })
    }
}