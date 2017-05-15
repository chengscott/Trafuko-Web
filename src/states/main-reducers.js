const mainInitState = {
    collapsed: false,
    modal_about: false,
    modal_logs:false
}   

export function main(state = mainInitState, action){
    
    switch(action.type){
        case '@MAIN_TOGGLE_NAV':
            return {
                ...state,
                collapsed: !state.collapsed
            }
        case '@MAIN_TOGGLE_MODAL_ABOUT':
            console.log(action.type);
            return {
                ...state,
                modal_about: !state.modal_about
            }
        case '@MAIN_TOGGLE_MODAL_LOGS':
            return {
                ...state,
                modal_logs: !state.modal_logs
            }
        default:
            return state;
    }
}