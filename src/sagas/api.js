import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
import { types, selectors } from '../reducers/api';
import * as middleware from '../middlewares/api';

const sagas = [takeLatest(types.FETCH_CHARACTERS_REQUESTED, fetchCharacters)];

export default sagas;

function* fetchCharacters() {
  try {
    const page = yield select(selectors.currentPage);

    const storedCharacters =
      JSON.parse(localStorage.getItem('characters')) ?? [];
    const storedSearch = JSON.parse(localStorage.getItem('search')) ?? {};

    const oneMinInMs = 60000;

    const characters = storedCharacters.find((element) => element.key === page);
    const filter = yield select(selectors.searchFilter);

    if (
      characters !== undefined &&
      storedSearch.filter === filter &&
      Date.now() < storedSearch.lastFetch + oneMinInMs
    ) {
      yield delay(100);
      yield put({
        type: types.FETCH_CHARACTERS_SUCCESS,
        characters: characters.data,
      });
    } else {
      if (storedSearch.filter !== filter) {
        storedCharacters.splice(0, storedCharacters.length);
      }
      const query = `query($fetchPage: Int) {
                characters( page: $fetchPage, filter: ${filter} ) {
                    info {
                        pages
                        next
                        prev
                        count
                    }
                    results {
                        id
                        name
                        status
                        species
                        type
                        gender
                        image
                        episode {
                            id
                            name
                            air_date
                            episode
                        }
                    }
                }
            }`;
      const { data, status } = yield call(middleware.fetchGraphQL, query, page);
      storedCharacters.push({
        key: page,
        data: data.data.characters,
      });
      localStorage.setItem('characters', JSON.stringify(storedCharacters));
      localStorage.setItem(
        'search',
        JSON.stringify({ filter, lastFetch: Date.now() })
      );
      if (status === 200) {
        yield put({
          type: types.FETCH_CHARACTERS_SUCCESS,
          characters: data.data.characters,
        });
      } else {
        yield put({ type: types.FETCH_CHARACTERS_ERROR });
      }
    }
  } catch (err) {
    yield put({ type: types.FETCH_CHARACTERS_ERROR });
  }
}
