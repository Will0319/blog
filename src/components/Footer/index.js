import React from 'react';
import './index.less';
import {Row} from 'antd';

export default class Footer extends React.Component{
    render(){
        return(
            <Row className='footer'>
                Created ©2018 杨轩 闽ICP备18019123号
            </Row>
        );
    }
}