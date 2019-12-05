import React from 'react';
import './App.css';
import {HashRouter as Router ,Route ,Switch} from 'react-router-dom'
import Home from './components/home';
import SongList from './components/songList';
import Player from './components/player';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
      <Route path='/songlist/:id' component={SongList}></Route>
      <Route path='/player' component={Player}></Route>
      <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
