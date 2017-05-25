export function toggleNav() {
    return {
        type: '@MAIN_TOGGLE_NAV'
    };
}

export function toggleModal_a() {
    return {
        type: '@MAIN_TOGGLE_MODAL_ABOUT'
    };
}

export function toggleModal_l() {
    return {
        type: '@MAIN_TOGGLE_MODAL_LOGS'
    };
}

export function setwrap(flag){
    return {
        type: '@MAIN_SET_WRAP',
        flag:flag
    };
}
