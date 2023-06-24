import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';

export const Footer = ({ isEmpty }) => {
  const styles = {
    footer: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
    },
  };

  return (
    <footer
      style={isEmpty ? styles.footer : {}}
      className="footer mt-auto py-3 bg-light specialFooter">
      <Container>
        <Row className="text-center">
          <Col md>
            <small className="text-muted">
              Copyright © 2023 Neil Vaca. All Rights Reserved.
            </small>
          </Col>
          <Col md>
            <section>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/neil-ronald-vaca-orrala/"
                rel="noreferrer">
                <img className="m-2" height={24} src={linkedinIcon} />
              </a>
              <a
                target="_blank"
                href="https://github.com/neilvaca"
                rel="noreferrer">
                <img className="m-2" height={24} src={githubIcon} />
              </a>
            </section>
          </Col>
          <Col md>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/terms-of-use">Terms of Use</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  isEmpty: PropTypes.bool,
};

Footer.defaultProps = {
  isEmpty: false,
};
