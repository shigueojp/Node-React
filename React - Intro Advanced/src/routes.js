import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      {/* Switch para apenas rotear um path em vez de dois */}
      <Switch>
        {/* EXACT -> o path precisa ser exatamanemente / */}
        <Route path="/" exact component={Main} />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
