import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store/configureStore';
// 获取工厂函数
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
