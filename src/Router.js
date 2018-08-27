// 兼容IE
import 'babel-polyfill';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import asyncComponent from './AsyncComponent';
const Home = asyncComponent(() => import("./pages/Home"));
const Blog = asyncComponent(() => import("./pages/Blog"));
const Archive = asyncComponent(() => import("./pages/Archive"));
const TagBlog = asyncComponent(() => import("./pages/TagBlog"));
const App = asyncComponent(() => import("./App"));

export default class Router extends React.Component {
    
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path='/blog/:number' component={Blog} />
                        <Route exact path='/tagblog/:name' component={TagBlog} />
                        <Route exact path='/archive' component={Archive} />
                        <Route exact path='/' component={Home} />
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}