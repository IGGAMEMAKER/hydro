import Dispatcher from '../dispatcher';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_SWITCH_COSTUME_OWNER,
    DISPATCHER_FLUSH_COSTUME_OWNER,
    DISPATCHER_COSTUME_WASH_INSIDE,
    DISPATCHER_SWITCH_COSTUME_SIZE,
    DISPATCHER_SWITCH_COSTUME_LOCATION,
    DISPATCHER_SWITCH_COSTUME_COMPOSITION,
    DISPATCHER_COSTUME_DISINFECT,
    DISPATCHER_COSTUME_REPAIR
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
    },

    washInsides: (id) => {
        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_WASH_INSIDE,
            id
        })
    },

    switchCostumeSize: (id, size) => {
        Dispatcher.dispatch({
            type: DISPATCHER_SWITCH_COSTUME_SIZE,
            id,
            size
        })
    },

    switchCostumeLocation: (id, location) => {
        Dispatcher.dispatch({
            type: DISPATCHER_SWITCH_COSTUME_LOCATION,
            id,
            location
        })
    },

    saveCompositionText: (id, composition) => {
        Dispatcher.dispatch({
            type: DISPATCHER_SWITCH_COSTUME_COMPOSITION,
            id,
            composition
        })
    },
    disinfectCostume: (id) => {
        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_DISINFECT,
            id,
            date: new Date(),
        })
    },

    repairCostume: (id) => {
        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_REPAIR,
            id
        })
    }
}