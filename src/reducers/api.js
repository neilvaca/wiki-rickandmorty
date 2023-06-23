// Action types
export const types = {
  FETCH_CHARACTERS_REQUESTED: 'api/FETCH_CHARACTERS_REQUESTED',
  FETCH_CHARACTERS_SUCCESS: 'api/FETCH_CHARACTERS_SUCCESS',
  FETCH_CHARACTERS_ERROR: 'api/FETCH_CHARACTERS_ERROR',

  CHANGE_CURRENT_PAGE: 'api/CHANGE_CURRENT_PAGE',
};

// Initial state
const initialState = {
  // episodes: {
  //   info: {},
  //   results: []
  // },
  characters: {
    info: {},
    results: [],
  },
  searchFilter: '{name: ""}',
  currentPage: 1,
  fetching: false,
  error: false,
};

// Reducer
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CHARACTERS_REQUESTED:
      return {
        ...state,
        searchFilter: action.searchFilter,
        fetching: true,
        error: false,
      };
    case types.FETCH_CHARACTERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        characters: action.characters,
      };
    case types.FETCH_CHARACTERS_ERROR:
      return {
        ...state,
        fetching: false,
        error: true,
      };

    case types.CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    default:
      return state;
  }
}

// Action creators
export const actions = {
  fetchCharacters: (searchFilter) => ({
    type: types.FETCH_CHARACTERS_REQUESTED,
    searchFilter,
  }),

  changeCurrentPage: (currentPage) => ({
    type: types.CHANGE_CURRENT_PAGE,
    currentPage,
  }),
};

// Selectors
export const selectors = {
  searchFilter: (state) => state.api.searchFilter,
  currentPage: (state) => state.api.currentPage,
  charactersInfo: (state) => state.api.characters.info,
  charactersResults: (state) => state.api.characters.results,

  isFetchingApi: (state) => state.api.fetching,
  hasErrorApi: (state) => state.api.error,
};
