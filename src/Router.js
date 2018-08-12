import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
// import Blog from './pages/Blog';
import Archive from './pages/Archive';

export default class Router extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        {/* <Route path='/blog' component={Blog} /> */}
                        <Route path='/archive' component={Archive} />
                        <Route path='/' component={Home} />
                        {/* <Route component={NoMatch} /> */}
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}