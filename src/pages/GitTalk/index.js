import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
import React from 'react';
import {Card} from 'antd';

export default class Home extends React.Component {

    componentDidMount(){
        const gitalk = new Gitalk({
            enable: true,
            clientID: '797bcc38ff786201e149',
            clientSecret: 'a50e58f138828bbe362b372eb0c52def70e7b621',
            repo: 'blogtalk',
            owner: 'Will0319',
            admin: 'Will0319',
            id: this.props.path,
            distractionFreeMode: false
        })
        gitalk.render('gitalk-container')
    }

    render(){
        return(
            <Card
                style={{ width: '100%' ,marginTop:20}}
            >
            <div id='gitalk-container'></div>
            </Card>
        )
    }

}
