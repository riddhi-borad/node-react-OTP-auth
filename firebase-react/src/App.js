import React from 'react';
import store from './store'
import './App.css';
import Login from './Components/Scripts/Login';
import Registration from './Components/Scripts/Registration';
import Home from './Components/Scripts/Home';
import PublicRoute from './Components/ReUsable/publicroute';
import PrivateRoute from './Components/ReUsable/privateroute';
import PageNotFound from './Components/Scripts/Pagenotfound';
import jwtDecode from "jwt-decode";
import {userLoginSuccess} from './Components/Redux/Useraction';
import {BrowserRouter as Router, Route, Redirect, Switch,withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
function App() {
  const Main=withRouter(()=>{
    const token=localStorage.getItem("user"); 
    if(token){
      const decoded=jwtDecode(token);
      store.dispatch(userLoginSuccess(decoded))
    }
  return (
    <div>
        <Switch>
          <PublicRoute exact path="/" component={Login}/>
          <PrivateRoute path="/register" component={Registration}/>
          <PrivateRoute path="/home" component={Home}/>
          <Route path="/404" component={PageNotFound}/>
          <Redirect to="/404"/>
        </Switch>
      </div>
  )
  })
  return (
    <Provider store={store}>
    <Router>
      <Main></Main>
    </Router>
   </Provider>
  );
}

export default App;
