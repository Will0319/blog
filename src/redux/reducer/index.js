/**
 * 数据处理
 */
// import { combineReducers } from 'redux'
import type from '../store/types';

export default (state , action) =>{
    switch(action.type){
        case type.ISSUES_LIST:
            return{
                ...state,
                issues: action.params
            }
        break;
        default:
            return { ...state };
    }
}