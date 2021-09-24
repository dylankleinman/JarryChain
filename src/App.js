import React, {Suspense} from 'react';
//import logo from './logo.svg';
import './App.css';
//import Cards from './Cards/Cards';
import TopNav from '../src/TopNav/TopNav';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home/Home';

const Cards = React.lazy(() => import('./Home/Cards/Cards'));  //using lazy loading only loads components when they are needed. 

function App() {
  return (
    <div className = "main">
      <BrowserRouter>
        <TopNav/>
        <Switch>
           {/* Here we are loading the Cards component only when the posts path is visited */}
          <Route path="/Posts" render = {() => <Suspense fallback={<div>Loading...</div>}><Cards/></Suspense>}/> 
          <Route path="/Other"/>
          <Route path="/" component = {Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
