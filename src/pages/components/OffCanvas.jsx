import {
  Offcanvas as Bootstrap,
  ListGroup,
  Badge,
  Container,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Children, useEffect, useState } from 'react';
import placeholderImage from '../../assets/placeholder.jpeg';

export const OffCanvas = ({ show, handleClose, character }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(character.image).then((response) => {
      if (response.status === 200) {
        setLoading(false);
      }
    });
  }, [character]);

  return (
    <Bootstrap
      className="general-delay"
      placement="end"
      show={show}
      onHide={handleClose}>
      <Bootstrap.Header closeButton>
        <Bootstrap.Title>{character.name}</Bootstrap.Title>
      </Bootstrap.Header>
      <Bootstrap.Body>
        <Container className="text-center mb-2 image-delay">
          {loading ? (
            <img
              style={{ minHeight: '300px' }}
              src={placeholderImage}
              alt="Loading ..."
            />
          ) : (
            <img
              style={{ minHeight: '300px' }}
              src={character.image}
              alt="Avatar"
            />
          )}
        </Container>

        <ListGroup as="ol" variant="flush" numbered>
          {character.episode &&
            Children.toArray(
              character.episode.map((value) => (
                <ListGroup.Item
                  key={value.id}
                  as="li"
                  className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{value.name}</div>
                    {value.air_date}
                  </div>
                  <Badge bg="success" pill>
                    {value.episode}
                  </Badge>
                </ListGroup.Item>
              ))
            )}
        </ListGroup>
      </Bootstrap.Body>
    </Bootstrap>
  );
};

OffCanvas.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
};

OffCanvas.defaultProps = {};
