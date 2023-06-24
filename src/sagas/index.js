import * as Sentry from '@sentry/react';

import { call, spawn, all } from 'redux-saga/effects';
import api from './api';

const sagas = [...api];

export default function* rootSaga() {
  yield all(
    sagas.map((saga) =>
      spawn(function* listenErrors() {
        try {
          yield call(function* execSaga() {
            yield saga;
          });
        } catch (error) {
          yield call(handleError, error);
        }
      })
    )
  );
}

export function handleError(err) {
  if (import.meta.env.VITE_SENTRY_ENABLED === 'true') {
    Sentry.captureException(err);
  }
}
