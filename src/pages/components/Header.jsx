import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  actions as apiAction,
  selectors as apiSelector,
} from '../../reducers/api';

import {
  Navbar,
  Image,
  Container,
  Stack,
  Form,
  Button,
  Spinner,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';

import searchIcon from '../../assets/search.svg';
import clearIcon from '../../assets/clear.svg';

import { getAnalytics, logEvent } from 'firebase/analytics';

const Header = ({
  showSearch,
  showTitle,
  isFetchingApi,
  fetchCharacters,
  changeCurrentPage,
}) => {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  const handleSubmit = (values, { setSubmitting }) => {
    if (import.meta.env.VITE_FIREBASE_ENABLED === 'true') {
      const analytics = getAnalytics();
      logEvent(analytics, 'header_handle_submit', {
        api_search: values.search,
      });
    }

    changeCurrentPage(1);
    fetchCharacters(`{name: "${values.search}"}`);
  };

  const handleClear = (setFieldValue, setTouched) => {
    if (import.meta.env.VITE_FIREBASE_ENABLED === 'true') {
      const analytics = getAnalytics();
      logEvent(analytics, 'header_handle_clear');
    }

    setFieldValue('search', '');
    setTouched({});
    changeCurrentPage(1);
    fetchCharacters('{name: ""}');
  };

  const schema = object().shape({
    search: string().required(),
  });

  return (
    <div className={`header ${scrollDirection === 'down' ? 'hide' : 'show'}`}>
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-light"
        expand="lg">
        <Container>
          <Navbar.Brand className="hidden-logo">
            <Link to="/">
              <Image
                alt="logo"
                src="/icon.png"
                width="32"
                height="32"
                className="d-inline-block align-top"
              />
            </Link>
            <span className={`${!showTitle && 'hidden-tittle'}`}>
              {' Wiki Rick and Morty'}
            </span>
          </Navbar.Brand>

          {showSearch && (
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{ search: '' }}>
              {({
                handleSubmit,
                handleChange,
                touched,
                values,
                errors,
                setFieldValue,
                setTouched,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Stack direction="horizontal" gap={2}>
                    <Form.Group controlId="validationFormik">
                      <Form.Control
                        className="me-auto"
                        name="search"
                        value={values.search}
                        onChange={handleChange}
                        isInvalid={touched.search && !!errors.search}
                        placeholder="Enter the name for search"
                      />
                      <Form.Control.Feedback type="invalid">
                        <small>Is a required field</small>
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      variant="outline-success"
                      type="submit"
                      disabled={isFetchingApi}>
                      {isFetchingApi ? (
                        <Spinner size="sm" />
                      ) : (
                        <img src={searchIcon} />
                      )}
                    </Button>

                    <Button
                      variant="outline-danger"
                      onClick={() => handleClear(setFieldValue, setTouched)}
                      disabled={isFetchingApi}>
                      {isFetchingApi ? (
                        <Spinner size="sm" />
                      ) : (
                        <img src={clearIcon} />
                      )}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

Header.propTypes = {
  showSearch: PropTypes.bool,
  isFetchingApi: PropTypes.bool,
  showTitle: PropTypes.bool,
};

Header.defaultProps = {
  showSearch: false,
  isFetchingApi: false,
  showTitle: false,
};

const mapStateToProps = (state) => ({
  isFetchingApi: apiSelector.isFetchingApi(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCharacters: (searchFilter) => {
    dispatch(apiAction.fetchCharacters(searchFilter));
  },
  changeCurrentPage: (current) => {
    dispatch(apiAction.changeCurrentPage(current));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
