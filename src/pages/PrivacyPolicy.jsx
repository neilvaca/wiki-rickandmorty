import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as apiAction } from '../reducers/api';

import { Container, ListGroup } from 'react-bootstrap';
import { Standard } from './layouts/Standard';

const PrivacyPolicy = ({ fetchCharacters, changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage(1);
    fetchCharacters('{name: ""}');
  }, []);

  return (
    <Standard isEmpty showTitle>
      <Container className="py-3" s>
        <h1 className="m-4 text-center">Privacy Policy</h1>
        <p className="m-4">
          On our website, we consume the REST API{' '}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer">
            The Rick and Morty API
          </a>{' '}
          to display data related to the TV series Rick and Morty. Additionally,
          we use Sentry and Firebase services such as Performance and Analytics
          to enhance the quality, performance, and analysis of the site. The
          following details how we handle information:
        </p>

        <ListGroup as="ol" numbered>
          <ListGroup.Item as="li">
            When you use our website, requests are made to the REST API{' '}
            <a
              href="https://rickandmortyapi.com"
              target="_blank"
              rel="noreferrer">
              The Rick and Morty API
            </a>{' '}
            to retrieve the necessary data for displaying it on the dashboard.
            We do not collect personal information from users through this
            interaction.
          </ListGroup.Item>
          <ListGroup.Item as="li">
            We utilize Sentry to monitor and log information regarding errors
            and failures on the website. This information helps us identify and
            address technical issues, but we do not collect personal data
            through this service.
          </ListGroup.Item>
          <ListGroup.Item as="li">
            We employ Firebase Performance to track website performance metrics
            such as page load time and server response. These data enable us to
            optimize site performance, but no personally identifiable
            information is collected in this process.
          </ListGroup.Item>
          <ListGroup.Item as="li">
            We utilize Firebase Analytics to gather information about user usage
            and interaction with our website. This information is used to better
            understand user preferences and behavior, and to enhance the user
            experience. We do not collect personally identifiable information
            through Firebase Analytics, and all collected information is handled
            in accordance with our privacy policies.
          </ListGroup.Item>
        </ListGroup>

        <p className="m-4 blankPage">
          We do not use cookies or other tracking technologies to track or
          collect personal information about visitors to our website. Any
          information collected through Firebase or Sentry is used in an
          aggregated and anonymous manner for analytical purposes.
        </p>
      </Container>
    </Standard>
  );
};

PrivacyPolicy.propTypes = {
  fetchCharacters: PropTypes.func,
  changeCurrentPage: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCharacters: (searchFilter) => {
    dispatch(apiAction.fetchCharacters(searchFilter));
  },
  changeCurrentPage: (current) => {
    dispatch(apiAction.changeCurrentPage(current));
  },
});

export default connect(null, mapDispatchToProps)(PrivacyPolicy);
