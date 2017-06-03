const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    color: 'black',
    len: 0,
    lenDanger: false,
    posted: false,
    toggle: false
};

export function postForm(state = initPostFormState, action) {
    switch (action.type) {
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
            };
        case '@POST_FORM/LEN_DANGER':
            return {
                ...state,
                lenDanger: action.flag
            };
        case '@POST_FORM/SET_POSTED':
            return {
                ...state,
                posted: action.flag
            };
        case '@POST_FORM/CHANGE_LEN':
            return {
                ...state,
                len: action.len
            };
        default:
            return state;
    }
}
