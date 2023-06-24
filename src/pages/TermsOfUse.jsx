import { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions as apiAction } from '../reducers/api';

import { Container, ListGroup } from 'react-bootstrap';
import { Standard } from './layouts/Standard';

const TermsOfUse = ({ fetchCharacters, changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage(1);
    fetchCharacters('{name: ""}');
  }, []);

  return (
    <Standard isEmpty showTitle>
      <Container className="py-3">
        <h1 className="m-4 text-center">Terms of Use</h1>
        <p className="m-4">By using our website, you agree to the following:</p>

        <ListGroup as="ol" className="blankPage">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Site Usage</div>
              You may access and use our website to view the data provided by
              the REST API{' '}
              <a
                href="https://rickandmortyapi.com"
                target="_blank"
                rel="noreferrer">
                The Rick and Morty API
              </a>
              . You must not use the site for illegal activities or activities
              that infringe upon the rights of third parties.
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Intellectual Property</div>
              All copyright and intellectual property rights for {'"'}Rick and
              Morty{'"'} belong to their respective owners.
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Services</div>
              Sentry, Firebase Performance, and Firebase Analytics are services
              provided by third parties, subject to third parties is terms and
              conditions. By using our website, you agree to comply with third
              parties is terms and policies.
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Limitation of Liability</div>
              We are not responsible for the accuracy, completeness, or
              availability of the data provided by the REST API{' '}
              <a
                href="https://rickandmortyapi.com"
                target="_blank"
                rel="noreferrer">
                The Rick and Morty API
              </a>
              . Additionally, we disclaim any liability for errors or technical
              failures related to Sentry and Firebase services. Use the
              information and services at your own risk.
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Standard>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCharacters: (searchFilter) => {
    dispatch(apiAction.fetchCharacters(searchFilter));
  },
  changeCurrentPage: (current) => {
    dispatch(apiAction.changeCurrentPage(current));
  },
});

export default connect(null, mapDispatchToProps)(TermsOfUse);
