import { Spinner } from 'react-bootstrap';
import '../../styles/Progress.css';

export const Progress = () => {
  return (
    <div>
      <Spinner className="spinner" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
