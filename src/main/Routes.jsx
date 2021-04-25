import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import DeliveryCrud from '../components/delivery/DeliveryCrud'
import DeliveryTable from '../components/delivery/DeliveryTable'



export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/delivery' component={DeliveryCrud} />
        <Route path='/deliveries' component={DeliveryTable} />

        <Redirect from='*' to='/' />
    </Switch>
