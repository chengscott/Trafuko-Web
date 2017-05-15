const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    color: 'black'
}

export function postForm(state = initPostFormState,action){
    switch(action.type) {
        case '@POST_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@POST_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@POST_FORM/COLOR_CHANGE':
            return {
                ...state,
                color: action.color
            }
        default:
            return state;
    }
}