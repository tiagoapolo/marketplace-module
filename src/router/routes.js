/* Modules */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

// Containers
import NotFound from '../containers/notFound'


function MyRouter() {

    return (
        <Switch>
            <Route exact path="/">
                <div>po</div>
            </Route>
            <Route exact path="/products">
                <div>dre</div>
            </Route>
            <Route exact path="/products/:id">
                {/* <Developer /> */}
            </Route>
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default withRouter(MyRouter);
