import React from 'react';
import './App.css';
import {HashRouter as Router ,Route ,Switch} from 'react-router-dom'
import Home from './components/home';
import SongList from './components/songList';
import Player from './components/player';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path='/songlist/:id' component={SongList}></Route>
      <Route path='/player/:songMid' component={Player}></Route>
      <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
