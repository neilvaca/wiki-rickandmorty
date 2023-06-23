import PropTypes from 'prop-types';
import { Blank } from '../components/Blank';
import { BlankTypes } from '../../constants/types';

export const Dashboard = ({ children, hasError, isFetching, hasData }) => {
  function getChildren(hasError, isFetching, hasData, children) {
    if (hasError) {
      return <Blank type={BlankTypes.Error} message="Internal Error" />;
    } else if (isFetching) {
      return <Blank type={BlankTypes.Loading} />;
    }
    return hasData ? (
      children
    ) : (
      <Blank type={BlankTypes.Empty} message="No data with the search" />
    );
  }

  return getChildren(hasError, isFetching, hasData, children);
};

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  hasError: PropTypes.bool,
  isFetching: PropTypes.bool,
  hasData: PropTypes.bool,
};

Dashboard.defaultProps = {
  children: undefined,
  hasError: false,
  isFetching: false,
  hasData: false,
};
