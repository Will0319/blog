import { applyMiddleware, createStore, compose} from 'redux';
import { createLogger } from 'redux-logger'

import reducer from './../reducer';

const initialState = {
    issues: []
}
// export default () => createStore(reducer, initialState);
// export default () => createStore(
//     reducer,
//     initialState,
//     applyMiddleware(logger)
// )

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        diff:true,
        collapsed:true
    });
    middlewares.push(logger);
}

export default () => compose(applyMiddleware(...middlewares))(createStore)(reducer, initialState);