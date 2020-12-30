import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './core/navbar';
import Home from './core/home';
import Maps from './core/maps';


const Routes = () => {
  return(
    <BrowserRouter>
      <Navbar/>
       <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/maps" exact component={Maps}/>
       </Switch>

    </BrowserRouter>
  );
 };

 export default Routes;
