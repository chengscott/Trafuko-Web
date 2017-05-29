const mainInitState = {
    collapsed: false,
    modal_about: false,
    modal_logs:false,
    wrapenable: true,
    logtxt: "登入"
};

export function main(state = mainInitState, action) {
    switch (action.type) {
        case '@MAIN_TOGGLE_NAV':
            return {
                ...state,
                collapsed: !state.collapsed
            };
        case '@MAIN_TOGGLE_MODAL_ABOUT':
            return {
                ...state,
                modal_about: !state.modal_about
            };
        case '@MAIN_TOGGLE_MODAL_LOGS':
            return {
                ...state,
                modal_logs: !state.modal_logs
            };
        case '@MAIN_SET_WRAP':
            return {
                ...state,
                wrapenable: action.flag
            };
        case '@MAIN_SET_LOGTXT':
            return {
                ...state,
                logtxt: action.str
            };
        default:
            return state;
    }
}
