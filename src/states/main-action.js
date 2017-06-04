//import {EventTypes} from 'redux-segment';

export function toggleNav() {
    return {
        type: '@MAIN_TOGGLE_NAV'
    };
}

export function toggleModal_a() {
    return {
        type: '@MAIN_TOGGLE_MODAL_ABOUT',
        //meta: {analytics: EventTypes.track}
    };
}

export function toggleModal_l() {
    return {
        type: '@MAIN_TOGGLE_MODAL_LOGS',
        //meta: {analytics: EventTypes.track}
    };
}

export function toggleModal_Info() {
    return {
        type: '@MAIN_TOGGLE_MODAL_INFO'
    };
}

export function setwrap(flag) {
    return {
        type: '@MAIN_SET_WRAP',
        flag: flag
    };
}

export function setLogTxt(str) {
    return {
        type: '@MAIN_SET_LOGTXT',
        str: str
    };
}

export function setUserid(id) {
    return {
        type: '@MAIN_SET_USERID',
        id: id
    };
}