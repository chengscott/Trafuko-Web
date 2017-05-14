const traukoInitState = {
    isAgree: false,
    runtext: true,
    runtextPage: 0
}


export function trafuko(state = traukoInitState, action){
    switch(action.type){
        case '@TRAFUKO_TOGGLE_AGREE':
            return {
                ...state,
                isAgree: !state.isAgree
            }
        case '@TRAFUKO_TOGGLE_RUNTEXT':
            return {
                ...state,
                runtext: !state.runtext
            }
        case '@TRAFUKO_SET_RUNTEXTPAGE':
            return {
                ...state,
                runtextPage: action.page
            }
        default:
            return state;
    }

}