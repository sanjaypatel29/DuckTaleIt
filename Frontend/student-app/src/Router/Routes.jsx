import React from 'react'
import { Route, Switch } from "react-router-dom"
import Home from '../Components/Home'
import { Add } from '../Components/Add'
import Edit from '../Components/Edit'


function Routes() {
    return (
        <>
            <Switch>
                <Route path="/" exact render={() => <Home />} />
                <Route path="/student" render={() => <Add />} />
                <Route path="/edit/:id" exact render={(props) => <Edit {...props} />} />
                <Route render={() => <div>Error:404 page not found</div>} />
            </Switch>
        </>
    )
}
export { Routes }