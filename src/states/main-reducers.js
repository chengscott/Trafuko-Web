const mainInitState = {
    collapsed: false,
    modal_about: false,
    modal_logs:false,
    modal_info: false,
    wrapenable: true,
    logtxt: '登入',
    userid: '',
    Data: []
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
        case '@MAIN_TOGGLE_MODAL_INFO':
            return {
                ...state,
                modal_info: !state.modal_info
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
        case '@MAIN_SET_USERID':
            return {
                ...state,
                userid: action.id
            };
        case '@MAIN_GET_DATA':
            return {
                ...state,
                Data: action.Data
            };
        case '@MAIN_SET_DATA_IFFAV':
            return {
                ...state,
                Data: action.Data
            };
        default:
            return state;
    }
}
