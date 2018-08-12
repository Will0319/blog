/**
 * 数据处理
 */
// import { combineReducers } from 'redux'
import {type} from '../action';

export default (state , action) =>{
    // console.log(action.params)
    switch(action.type){
        case type.ISSUES_LIST:
            return{
                ...state,
                issues: action.params
            }
        break;
        case type.TAG_TOGGLE:
            return{
                ...state,
                tagvisible:action.params
            }
        break;
        case type.NOW_TAG_NAME:
            return{
                ...state,
                nowtagname:action.params
            }
        break;
        default:
            return { ...state };
    }
}