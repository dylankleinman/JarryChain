import React, {useState} from 'react';
import './App.css';
import TopNav from '../src/TopNav/TopNav';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
import Portfolio from './Portfolio/Portfolio';
import History from './History/History';

//const Cards = React.lazy(() => import('./Home/Cards/Cards'));  //using lazy loading only loads components when they are needed. 

function App() {

  const[userAddress, setuserAddress] = useState('')

  return (
    <div className = "main">
      <BrowserRouter>
        <TopNav parentCallback = {(data) => setuserAddress(data)}></TopNav>
        <Switch>
           {/* Here we are loading the Cards component only when the posts path is visited */}
          {/* <Route path="/Posts" render = {() => <Suspense fallback={<div>Loading...</div>}><Cards/></Suspense>}/>  */}
          <Route path="/Portfolio"><Portfolio address={userAddress}></Portfolio></Route>
          <Route path="/History"><History address={userAddress}></History></Route>
          <Route path="/"><Home></Home></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
