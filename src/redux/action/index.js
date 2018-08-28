/**
 * Action:类型
 */
import type from '../store/types';

export function issuesList(params){
    return {
        type: type.ISSUES_LIST,
        params
    }
}