import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter  } from 'react-router-dom';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/utils/ScrollToTop';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from './app/config/firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';

const store = configureStore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

const rootEl = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <ScrollToTop>
            <ReduxToastr 
              position='bottom-right'
              transitionIn='fadeIn'
              transitionOut='fadeOut'
            />
            <App />
          </ScrollToTop>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>,
    rootEl
  );




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();