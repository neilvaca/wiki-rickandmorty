import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import rootReducer from './reducers/index';

import 'bootstrap/dist/css/bootstrap.min.css';

import { initializeApp } from 'firebase/app';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

if (import.meta.env.VITE_FIREBASE_ENABLED === 'true') {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_PROJECT_ID + '.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_PROJECT_ID + '.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
  getPerformance(app);
}

// Sentry
import * as Sentry from '@sentry/react';
import { version, name } from '../package.json';

if (import.meta.env.VITE_SENTRY_ENABLED === 'true') {
  Sentry.init({
    environment: import.meta.env.VITE_ENVIRONMENT,
    release: `${name}@${version}`,

    dsn: `https://${import.meta.env.VITE_SENTRY_PUBLIC_KEY}@o${
      import.meta.env.VITE_SENTRY_ORGANIZATION_ID
    }.ingest.sentry.io/${import.meta.env.VITE_SENTRY_PROJECT_ID}`,
    integrations: [
      new Sentry.BrowserTracing({
        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          'localhost',
          new RegExp(
            `^https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}.web/app`
          ),
        ],
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  });
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
