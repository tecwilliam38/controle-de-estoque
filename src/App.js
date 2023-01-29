import './App.css';
import React from 'react';
// import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import Rotas from './routes/index'
import store from './store';



function App() {
  return (
   <>
    <Provider store={store}>
      <Rotas />
    </Provider>
   </>
  );
}

export default App;
