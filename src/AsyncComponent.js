import React, { Component } from "react";
import {Spin} from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            };
            NProgress.start();
            // console.log('start')
        }
        
        async componentDidMount() {
            const { default: component } = await importComponent();

            this.setState({
                component: component
            });
        }

        render() {
            const Component = this.state.component;
            if (Component){
                NProgress.done();
                // console.log('done')
            }
            return Component ? <Component {...this.props} /> : <div style={{width:'100vh',height:'100vh'}}><Spin style={{position:"absolute",marginTop:'48%',marginLeft:'49%'}} size='large' tip="Loading..."/></div>
        }
    }

    return AsyncComponent;
}