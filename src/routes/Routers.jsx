import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { appURLS } from '../constants'
import Login from '../pages/Login'
import Subjects from '../pages/Subjects'
import PlayVideo from "../pages/PlayVideo"
import ConceptsList from '../pages/ConceptsList'
import DrawingApp from '../components/writingTool/DrawingApp'

const Routers = () => {
  return (
        <Switch>
            <Route path={appURLS.LOGIN}>
                <Login />
            </Route>
            <Route path={appURLS.SUBJECTS}>
                <Subjects />
            </Route>
            <Route path={`${appURLS.COURSE}/:subject`} exact>
                <ConceptsList />
            </Route>
            <Route path={`${appURLS.PLAY}`} exact>
                <PlayVideo />
            </Route>
            <Route path={`${appURLS.WORKSHEET}`} exact>
                <DrawingApp />
            </Route>
            <Route exact path="*">
                <Redirect to={appURLS.LOGIN} />
            </Route>
        </Switch>
    
  )
}

export default Routers
