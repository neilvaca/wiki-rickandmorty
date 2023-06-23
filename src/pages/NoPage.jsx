import { Standard } from './layouts/Standard';
import { Blank } from './components/Blank';
import { BlankTypes } from './../constants/types';

const NoPage = () => {
  return (
    <Standard isEmpty showTitle>
      <Blank type={BlankTypes.NotFound} message={'Page not found'} />
    </Standard>
  );
};

export default NoPage;
