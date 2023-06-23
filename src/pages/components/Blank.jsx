import PropTypes from 'prop-types';

import errorImage from '../../assets/error.svg';
import loadingImage from '../../assets/loading.svg';
import emptyImage from '../../assets/empty.svg';
import notFoundImage from '../../assets/not_found.svg';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BlankTypes } from '../../constants/types';

export const Blank = ({ message, type }) => {
  const [srcImg, setSrcImg] = useState(loadingImage);

  useEffect(() => {
    switch (type) {
      case BlankTypes.NotFound:
        setSrcImg(notFoundImage);
        break;
      case BlankTypes.Error:
        setSrcImg(errorImage);
        break;
      case BlankTypes.Empty:
        setSrcImg(emptyImage);
        break;
      default:
        setSrcImg(loadingImage);
        break;
    }
  }, [type]);

  return (
    <Container className="text-center general-delay">
      <Row className="mt-5">
        <Col>
          <h1>{message}</h1>
        </Col>
      </Row>

      <Row className="m-5">
        <Col>
          {type === BlankTypes.Loading && <span className="loader" />}
          <Image src={srcImg} fluid />
        </Col>
      </Row>
    </Container>
  );
};

Blank.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

Blank.defaultProps = {
  message: undefined,
  type: undefined,
};
