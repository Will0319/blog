// 引入createStore创建store，引入applyMiddleware 来使用中间件
import {createStore} from 'redux';
import reducer from './../reducer';

const initialState = {
    issues: []
}
export default () => createStore(reducer, initialState);