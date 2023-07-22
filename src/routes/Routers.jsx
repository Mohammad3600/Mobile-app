import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { appURLS } from '../constants'
import Login from '../pages/Login'
import Subjects from '../pages/Subjects'
import Chemistry from '../pages/Chemistry'
import PlayVideo from "../pages/PlayVideo"

const Routers = () => {
  return (
        <Switch>
            <Route path={appURLS.LOGIN}>
                <Login />
            </Route>
            <Route path={appURLS.SUBJECTS}>
                <Subjects />
            </Route>
            <Route path={appURLS.CHEMISTRY} exact>
                <Chemistry />
            </Route>
            <Route path={`${appURLS.PLAY}`} exact>
                <PlayVideo />
            </Route>
            <Route exact path="/">
                <Redirect to={appURLS.LOGIN} />
            </Route>
        </Switch>
    
  )
}

export default Routers
