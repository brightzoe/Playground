import React from 'react';
import { HashRouter as Router, Route,Switch } from 'react-router-dom';
import App from './pages/app';
import Login from './pages/login';
import Home from './pages/home';
export default function IRouter() {
	return (
    <Router>
      <Switch></Switch>
			<Route path="/" exact component={App}></Route>
			<Route path="/login" exact  component={Login}></Route>
			<Route path="/home" exact component={Home}></Route>
		</Router>
	);
}
