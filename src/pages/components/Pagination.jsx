import PropTypes from 'prop-types';
import { Pagination as Bootstrap } from 'react-bootstrap';

import { getAnalytics, logEvent } from 'firebase/analytics';

export const Pagination = ({ currentPage, changeCurrentPage, pages }) => {
  const handleChange = (page) => {
    if (import.meta.env.VITE_FIREBASE_ENABLED === 'true') {
      const analytics = getAnalytics();
      logEvent(analytics, 'pagination_handle_change', {
        api_page: page,
      });
    }

    changeCurrentPage(page);
  };

  return (
    <Bootstrap className="justify-content-center">
      <Bootstrap.First
        disabled={currentPage === 1}
        onClick={() => handleChange(1)}
      />
      <Bootstrap.Prev
        disabled={currentPage === 1}
        onClick={() => handleChange(currentPage - 1)}
      />

      {currentPage > 3 && <Bootstrap.Ellipsis />}

      {pages &&
        [...Array(pages).keys()].map(
          (number) =>
            number + 1 >= currentPage - 2 &&
            number + 1 <= currentPage + 2 && (
              <Bootstrap.Item
                key={number}
                active={number + 1 === currentPage}
                onClick={() =>
                  number + 1 !== currentPage && handleChange(number + 1)
                }>
                {number + 1}
              </Bootstrap.Item>
            )
        )}

      {currentPage < pages - 2 && <Bootstrap.Ellipsis />}

      <Bootstrap.Next
        variant="dark"
        disabled={currentPage === pages}
        onClick={() => handleChange(currentPage + 1)}
      />
      <Bootstrap.Last
        variant="dark"
        disabled={currentPage === pages}
        onClick={() => handleChange(pages)}
      />
    </Bootstrap>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  changeCurrentPage: PropTypes.func,
  pages: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  pages: 9,
};
