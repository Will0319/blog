/**
 * Action:类型
 */
export const type = {
    ISSUES_LIST:'ISSUES_LIST'
}

export function issuesList(params){
    return {
        type: type.ISSUES_LIST,
        params
    }
}