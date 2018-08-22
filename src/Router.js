import 'babel-polyfill';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import asyncComponent from './AsyncComponent';
// import App from './App';
// import Home from './pages/Home';
// import Blog from './pages/Blog';
// import Archive from './pages/Archive';
// import TagBlog from './pages/TagBlog';
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
                        <Route path='/blog/:number' component={Blog} />
                        <Route path='/tagblog/:name' component={TagBlog} />
                        <Route path='/archive' component={Archive} />
                        <Route path='/' component={Home} />
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}