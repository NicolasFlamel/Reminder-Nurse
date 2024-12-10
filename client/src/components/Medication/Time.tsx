import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import { BootstrapFormOnChange } from 'types';

interface TimeProps {
  data: { time: string; index: number };
  handleChange: (e: BootstrapFormOnChange, index: number) => void;
  handleRemove: (index: number) => void;
}
export const Time = ({ data, handleChange, handleRemove }: TimeProps) => {
  return (
    <li className="d-flex medTime">
      <Form.Control
        required
        type="time"
        name="times"
        className="form-input"
        onChange={(e) => handleChange(e, data.index)}
        defaultValue={data.time}
      ></Form.Control>
      {data.index !== 0 ? (
        <button
          type="button"
          className="fa-xs MedToggleB"
          aria-label="Close"
          onClick={() => handleRemove(data.index)}
        >
          <FontAwesomeIcon icon={faCalendarXmark} className="MedFAIcon" />
        </button>
      ) : null}
    </li>
  );
};

export default Time;
