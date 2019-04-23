// import "@babel/polyfill";
// babel函数填充库

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './reactHome';
import List from './reactList';

class App extends Component {
  componentDidMount() {
    axios.get('/react/api/header.json')
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('react'));
