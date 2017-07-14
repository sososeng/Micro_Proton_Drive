import React, { Component } from 'react';

import './App.css';
import Router from './routes';
import { Provider } from 'react-redux';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

import store from './store';
import { AUTH_USER } from './actions/types';

// if (token) {
//   store.dispatch({ type: AUTH_USER });
// }

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      //   <Router history={BrowserRouter} routes={routes} />
      // </Provider>
      <CookiesProvider>
        <MainCookie/>
      </CookiesProvider>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    const token = this.props.cookies.get('token');
    console.log(token);
  }
  render() {
    return (
      <Provider store={store}>
       <Router/>
      </Provider>
    );
  }
}

var MainCookie = withCookies(Main);

export default App;
