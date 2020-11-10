
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ErrorHandler.scss';

function ErrorHandler(props){
  
    return (
      <div data-testid="error" className="error-container">
        <FontAwesomeIcon icon="exclamation-triangle" size="3x" className="error-icon" />
        <h6>
          {props.msg != null ? props.msg : "There's been an error"}
        </h6>
      </div>
    );
  }

export default ErrorHandler;