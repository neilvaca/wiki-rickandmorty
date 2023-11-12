import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card as Bootstrap, Button, Badge } from 'react-bootstrap';
import { Progress } from './Progress';
import placeholderImage from '../../assets/placeholder.jpeg';

export const Card = ({
  id,
  name,
  image,
  onClick,
  episode,
  status,
  species,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(image).then((response) => {
      if (response.status === 200) {
        setLoading(false);
      }
    });
  }, [image]);

  const styles = {
    width: {
      width: '300px',
    },
  };

  function getBgForStatus(status) {
    if (status === 'Dead') {
      return 'danger';
    }
    return status === 'Alive' ? 'primary' : 'secondary';
  }

  return (
    <Bootstrap
      className="mb-2 text-center general-delay"
      key={id}
      style={styles.width}>
      <div className="general-delay">
        {loading ? (
          <>
            <Bootstrap.Img
              className="image-delay"
              variant="top"
              style={{ minHeight: '300px' }}
              src={placeholderImage}
              alt="Loading ..."
              loading="lazy"
            />
            <Progress />
          </>
        ) : (
          <Bootstrap.Img
            variant="top"
            className="image-delay"
            style={{ minHeight: '300px' }}
            src={image}
            alt="Avatar"
            loading="lazy"
          />
        )}
      </div>

      <Bootstrap.Body>
        <Bootstrap.Title>{name}</Bootstrap.Title>
        <Badge pill className="mb-2" bg={getBgForStatus(status)}>
          {status}
        </Badge>{' '}
        {species}
        <div className="d-grid gap-2">
          <Button
            variant="dark"
            size="lg"
            onClick={() => onClick({ name, image, episode })}>
            Episodes
          </Button>
        </div>
      </Bootstrap.Body>
    </Bootstrap>
  );
};

Card.propTypes = {
  status: PropTypes.string,
  species: PropTypes.string,
  episode: PropTypes.array,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  name: null,
  image: null,
  status: null,
  species: null,
  episode: null,
  onClick: undefined,
};
