//import {EventTypes} from 'redux-segment';

export function input(value) {
    return {
        type: '@POST_FORM/INPUT',
        value
    };
}

export function inputDanger(danger) {
    return {
        type: '@POST_FORM/INPUT_DANGER',
        danger
    };
}

export function colorChange(color) {
    return {
        type: '@POST_FORM/COLOR_CHANGE',
        color: color,
        //meta: {analytics: EventTypes.track}
    };
}

export function lenDanger(flag) {
    return {
        type: '@POST_FORM/LEN_DANGER',
        flag: flag,
        //meta: {analytics: EventTypes.track}
    };
}

export function setPosted(flag) {
    return {
        type: '@POST_FORM/SET_POSTED',
        flag: flag
    };
}

export function changeLen(len) {
    return {
        type: '@POST_FORM/CHANGE_LEN',
        len: len
    };
}
