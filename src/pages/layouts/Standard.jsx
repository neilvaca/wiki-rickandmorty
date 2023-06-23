import PropTypes from 'prop-types';

import { Footer } from '../components/Footer';
import Header from '../components/Header';

export const Standard = ({ children, showSearch, isEmpty, showTitle }) => {
  return (
    <>
      <Header showSearch={showSearch} showTitle={showTitle} />
      {children}
      <Footer isEmpty={isEmpty} />
    </>
  );
};

Standard.propTypes = {
  children: PropTypes.node.isRequired,
  showSearch: PropTypes.bool,
  isEmpty: PropTypes.bool,
  showTitle: PropTypes.bool,
};

Standard.defaultProps = {
  children: undefined,
  showSearch: false,
  isEmpty: false,
  showTitle: false,
};
