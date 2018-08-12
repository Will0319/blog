/**
 * Action:类型
 */
export const type = {
    ISSUES_LIST:'ISSUES_LIST',
    TAG_TOGGLE:'TAG_TOGGLE',
    NOW_TAG_NAME:'NOW_TAG_NAME'
}

export function issuesList(params){
    return {
        type: type.ISSUES_LIST,
        params
    }
}

export function tagToggle(params){
    return {
        type:type.TAG_TOGGLE,
        params
    }
}

export function nowTagName(params){
    return{
        type:type.NOW_TAG_NAME,
        params
    }
}