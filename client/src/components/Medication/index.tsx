import './styles.css';
import { FormEvent, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_MEDICINE, UPDATE_MEDICINE } from 'utils/mutations';
import { addMedicineCache, updateMedicineCache } from 'utils/handleCache';
import { useNavigate, Link } from 'react-router-dom';
import Time from './Time';
import { BootstrapFormOnChange, MedicineType } from 'types';

interface MedicationProps {
  medicine?: MedicineType;
}
export const Medication = ({ medicine }: MedicationProps) => {
  const navigate = useNavigate();
  const [createMedicine] = useMutation(ADD_MEDICINE, addMedicineCache);
  const [updateMedicine] = useMutation(UPDATE_MEDICINE, updateMedicineCache);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: medicine?.name || '',
    dosage: medicine?.dosage || 1,
    amount: medicine?.amount || 0,
    interval: medicine?.interval || 'daily',
    subInterval: medicine?.subInterval || 'every',
    times: medicine?.times || ['00:00'],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    if (!medicine) {
      const variables = { medicine: { ...formData } };
      await createMedicine({ variables });
    } else {
      const variables = { medicineId: medicine._id, medicine: { ...formData } };
      await updateMedicine({ variables });
    }

    navigate('/');
  };

  const handleChange = (e: BootstrapFormOnChange, index?: number) => {
    const { name, value } = e.target;

    switch (name) {
      case 'dosage':
      case 'amount':
        setFormData({ ...formData, [name]: parseInt(value) });
        break;
      case 'times': {
        const times: string[] = [];

        for (let i = 0; i < formData.times.length; i++) {
          if (i === index) times.push(value);
          else times.push(formData.times[i]);
        }

        setFormData({ ...formData, times });
        break;
      }
      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
  };

  const handleAddTime = () => {
    const times = [...formData.times, '00:00'];
    setFormData({ ...formData, times });
  };

  const handleRemoveTime = (index: number) => {
    const times = [...formData.times].splice(index, 1);
    setFormData({ ...formData, times });
  };

  return (
    <Container>
      <Form
        className="form-container shadow"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        action="/medicines"
      >
        <Form.Group className="form-title" controlId="medicineName">
          <Form.Label className="label-usrName">Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            className="form-input"
            placeholder="Type in the name of your medicine"
            onChange={handleChange}
            defaultValue={medicine ? medicine.name : undefined}
          ></Form.Control>
          <Form.Control.Feedback type="invalid" className="MedFeedback">
            Please input a name!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineInterval">
          <Form.Label className="label-usrName">Interval</Form.Label>
          <Form.Select
            name="interval"
            className="form-input"
            onChange={handleChange}
            defaultValue={medicine ? medicine.interval : undefined}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineSubInterval">
          <Form.Label className="label-usrName">Subinterval</Form.Label>
          <Form.Select
            name="subInterval"
            className="form-input"
            onChange={handleChange}
            defaultValue={medicine ? medicine.subInterval : undefined}
          >
            <option>Every</option>
            <option>Every Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineAmount">
          <Form.Label className="label-usrName">Dosage</Form.Label>
          <Form.Control
            required
            type="number"
            name="dosage"
            className="form-input"
            onChange={handleChange}
            placeholder="Type in the name of your medication dosage"
            defaultValue={medicine ? medicine.dosage : undefined}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineAmount">
          <Form.Label className="label-usrName">Total Amount</Form.Label>
          <Form.Control
            required
            type="number"
            name="amount"
            className="form-input"
            onChange={handleChange}
            placeholder="Type in the remaining quantities of your medication"
            defaultValue={medicine ? medicine.amount : undefined}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="form-title" controlId="medicineTimes">
          <Form.Label className="label-usrName">Times</Form.Label>
          <Button className="add-time" onClick={handleAddTime}>
            Add Time
          </Button>
          <ul className="none d-flex flex-wrap justify-content-between">
            {formData.times.map((time, index) => {
              return (
                <Time
                  key={index}
                  data={{ time, index }}
                  handleChange={handleChange}
                  handleRemove={handleRemoveTime}
                />
              );
            })}
          </ul>
        </Form.Group>

        <section className="d-flex flex-wrap justify-content-evenly">
          <Button
            className="form-submit-btn m-0"
            variant="primary"
            type="submit"
          >
            Save
          </Button>
          <Link to={'../medicines'} className="w-100">
            <Button className="switchClick" variant="primary">
              Cancel
            </Button>
          </Link>
        </section>
      </Form>
    </Container>
  );
};

export default Medication;
