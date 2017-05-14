export function toggleAgree(){  
    return {
        type: '@TRAFUKO_TOGGLE_AGREE'
    }
}


export function toggleRuntext(){
    return {
        type: '@TRAFUKO_TOGGLE_RUNTEXT'
    }
}

export function setRuntextPage(page){
    console.log(page);
    return {
        type: '@TRAFUKO_SET_RUNTEXTPAGE',
        page: page
    }
}