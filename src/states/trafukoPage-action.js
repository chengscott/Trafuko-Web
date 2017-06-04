import {EventTypes} from 'redux-segment';

export function toggleAgree() {
    return {
        type: '@TRAFUKO_TOGGLE_AGREE'
    };
}

export function toggleRuntext() {
    return {
        type: '@TRAFUKO_TOGGLE_RUNTEXT',
        meta: {analytics: EventTypes.track}
    };
}

export function setRuntextPage(page) {
    return {
        type: '@TRAFUKO_SET_RUNTEXTPAGE',
        page: page
    };
}

export function receiveData(data) {
    return {
        type: '@TRAFUKO_RECEIVE_DATA',
        data: data
    };
}

export function setRuntext(flag) {
    return {
        type: '@TRAFUKO_SET_RUNTEXT',
        flag: flag
    };
}

export function setAgree(flag) {
    return {
        type: '@TRAFUKO_SET_AGREE',
        flag: flag
    };
}
