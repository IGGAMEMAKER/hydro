import Dispatcher from '../dispatcher';
import backup from '../helpers/backup';

import {
    DISPATCHER_COSTUME_ADD,
    DISPATCHER_COSTUME_REMOVE,
    DISPATCHER_SWITCH_COSTUME_OWNER,
    DISPATCHER_FLUSH_COSTUME_OWNER,
    DISPATCHER_COSTUME_WASH_INSIDE,
    DISPATCHER_SWITCH_COSTUME_SIZE,
    DISPATCHER_SWITCH_COSTUME_LOCATION,
    DISPATCHER_SWITCH_COSTUME_COMPOSITION,
    DISPATCHER_COSTUME_DISINFECT,
    DISPATCHER_COSTUME_REPAIR,
    DISPATCHER_COSTUME_CERTIFICATION,
    DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION,

    DISPATCHER_IMPORT_DB
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

    importDB: () => {
        backup.read()
            .then(file => {
                console.log('backup.read');
                Dispatcher.dispatch({
                    type: DISPATCHER_IMPORT_DB,
                    file
                })
            })
            .catch(err => { console.log('importDB in CostumeActions.js', err); });
    },

    saveDB: async (_history, _costumes) => {
        backup.make(_history, _costumes);
    },

    addCostume: (costume, id) => {
        console.log('CostumeActions.js addCostume', costume, id);

        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_ADD,
            costume,
            id
        })
    },

    deleteCostume: (id) => {
        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_REMOVE,
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

    saveCertificationExpirationDate: (id, date) => {
        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION,
            id,
            date
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
    },
    submitCertification: (id, checkboxes, day, month, year) => {
        Dispatcher.dispatch({
            type: DISPATCHER_COSTUME_CERTIFICATION,
            id,
            checkboxes,
            day, month, year
        })
    }
}