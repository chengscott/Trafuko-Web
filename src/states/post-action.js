import {createPost as createPostFromApi} from 'api/post';


export function createPost(color, text) {
    return (dispatch) => {
        return createPostFromApi(color, text).then(feedback => {
            if(feedback) {
                console.log("I got it!");
            }else {
                console.log("fail to get response");
            }
            dispatch(inputDanger(false));
            dispatch(input(''));
        }).catch(err => {
            console.error('Error creating post', err);
        });
    };
}

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