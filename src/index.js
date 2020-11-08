import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import PostItem from './components/PostItem';
import { Router, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])
library.add(...iconList);

const hist = createBrowserHistory(); 

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/:identifier">
        <PostItem />
      </Route>
      <Route path="/">
      <PostItem identifier="InformationM"/>
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);