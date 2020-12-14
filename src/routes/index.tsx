import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    {/**
     * O sinal de + indica que o parametro é tudo o que vem depois do sinal ':'
     * e ajuda a incluir parametros que contenham sinal de '/'
     */}
    <Route path="/repository/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
