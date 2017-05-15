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
        color: color
    }
}
