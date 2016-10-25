import formatDate from './date-formatter';

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

export default function (record) {
    const showDate = (date) => {
        return `(${formatDate(date)})`;
    }

    switch (record.tag) {
        case DISPATCHER_SWITCH_COSTUME_OWNER:
            return `Смена владельца: ${record.data.owner} ${showDate(record.data.date)}`;
            break;
        case DISPATCHER_FLUSH_COSTUME_OWNER:
            return `Возврат костюма ${showDate(record.data.date)}`;
            break;
        case DISPATCHER_COSTUME_WASH_INSIDE:
            return `Стирка внутренней подкладки ${showDate(record.data.date)}`;
            break;
        case DISPATCHER_COSTUME_REPAIR:
            return `Ремонт гидрокостюма ${showDate(record.data.date)}`;
            break;
        case DISPATCHER_COSTUME_DISINFECT:
            return `Продезинфицировано ${showDate(record.data.date)}`;
            break;
        case DISPATCHER_SWITCH_COSTUME_SIZE:
            return ``;
            break;
        case DISPATCHER_SWITCH_COSTUME_LOCATION:
            return `Смена местоположения: ${record.data.location} ${showDate(record.data.date)}`;
            break;
        case DISPATCHER_COSTUME_CERTIFICATION:
//                certification
            return `Проведение техосмотра: ${showDate(record.data.date)}`;
            break;
        case DISPATCHER_COSTUME_CERTIFICATION_EXPIRATION:
            return `Проведение сертификации: с ${showDate(record.data.date)} до ${showDate(record.data.expires)}`;
            break;
        case DISPATCHER_SWITCH_COSTUME_COMPOSITION:
            return `Смена комплектации состава: ${record.data.composition} ${showDate(record.data.date)}`;
            break;
    }
}