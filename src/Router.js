import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Archive from './pages/Archive';
import TagBlog from './pages/TagBlog';

export default class Router extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/blog/:number' component={Blog} />
                        <Route path='/tagblog/:name' component={TagBlog} />
                        <Route path='/archive' component={Archive} />
                        <Route path='/' component={Home} />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}