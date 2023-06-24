import { useState, useEffect, Children } from 'react';
import { connect } from 'react-redux';
import {
  actions as apiAction,
  selectors as apiSelector,
} from '../reducers/api';
import { object, func, bool, array, number } from 'prop-types';

import { OffCanvas } from './components/OffCanvas';
import { Card } from './components/Card';
import { Pagination } from './components/Pagination';
import { Row, Col, Container, Image } from 'react-bootstrap';

import { Standard } from './layouts/Standard';
import { Dashboard } from './layouts/Dashboard';

import { getAnalytics, logEvent } from 'firebase/analytics';

const Home = ({
  hasErrorApi,
  isFetchingApi,
  currentPage,
  charactersInfo,
  charactersResults,
  fetchCharacters,
  changeCurrentPage,
  searchFilter,
}) => {
  const [show, setShow] = useState(false);
  const [character, setCharacter] = useState({
    name: '',
    image: '',
    episode: [],
  });

  const handleClose = () => setShow(false);
  const handleShow = (character) => {
    if (import.meta.env.VITE_FIREBASE_ENABLED === 'true') {
      const analytics = getAnalytics();
      logEvent(analytics, 'off_canvas_handle_show', {
        api_name: character.name,
        api_image: character.image,
      });
    }
    
    setShow(true);
    setCharacter(character);
  };

  useEffect(() => {
    fetchCharacters(searchFilter);
  }, [currentPage]);

  const [hasData, setHasData] = useState(true);
  useEffect(() => {
    setHasData(charactersResults?.length > 0);
  }, [charactersResults]);

  return (
    <Standard showSearch isEmpty={!hasData || isFetchingApi}>
      <Dashboard
        hasError={hasErrorApi}
        isFetching={isFetchingApi}
        hasData={hasData}>
        <OffCanvas
          show={show}
          handleClose={handleClose}
          character={character}
        />

        <Container className="my-3">
          <Col
            xs={{ span: 10, offset: 1 }}
            xl={{ span: 8, offset: 2 }}
            className="justify-content-center mb-4 image-delay">
            <Image fluid src="/banner.png" />
          </Col>

          <Row className="justify-content-center mb-2">
            {charactersResults &&
              Children.toArray(
                charactersResults.map((value) => (
                  <Col xs="auto">
                    <Card
                      id={value.id}
                      name={value.name}
                      image={value.image}
                      episode={value.episode}
                      onClick={handleShow}
                      status={value.status}
                      species={value.species}
                    />
                  </Col>
                ))
              )}
          </Row>
          <Pagination
            currentPage={currentPage}
            pages={charactersInfo.pages}
            changeCurrentPage={changeCurrentPage}
          />
        </Container>
      </Dashboard>
    </Standard>
  );
};

Home.propTypes = {
  hasErrorApi: bool,
  isFetchingApi: bool,
  currentPage: number,
  charactersInfo: object,
  charactersResults: array,
  fetchCharacters: func,
  changeCurrentPage: func,
};

Home.defaultProps = {
  hasErrorApi: false,
  isFetchingApi: false,
  currentPage: 1,
  charactersInfo: {
    pages: 9,
    next: 8,
    prev: 6,
    count: 107,
  },
  charactersResults: [
    {
      id: 1,
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
      id: 2,
      name: 'Morty Smith',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
    {
      id: 3,
      name: 'Summer Smith',
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    },
    {
      id: 4,
      name: 'Beth Smith',
      image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    },
  ],
};

const mapStateToProps = (state) => ({
  isFetchingApi: apiSelector.isFetchingApi(state),
  hasErrorApi: apiSelector.hasErrorApi(state),
  searchFilter: apiSelector.searchFilter(state),
  currentPage: apiSelector.currentPage(state),
  charactersInfo: apiSelector.charactersInfo(state),
  charactersResults: apiSelector.charactersResults(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCharacters: (searchFilter) => {
    dispatch(apiAction.fetchCharacters(searchFilter));
  },
  changeCurrentPage: (current) => {
    dispatch(apiAction.changeCurrentPage(current));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
