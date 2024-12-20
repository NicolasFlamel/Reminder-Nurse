import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from 'utils/auth';
import { ADD_USER } from 'utils/mutations';
import { ApolloError, useMutation } from '@apollo/client';
import { SetState } from 'types';

interface SignupFormProps {
  setLoggedIn: SetState<boolean>;
  switchForm: () => void;
}
export const SignupForm = ({ setLoggedIn, switchForm }: SignupFormProps) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
  });
  const [addUser, { loading }] = useMutation(ADD_USER);
  const [validated] = useState(false);
  const [formAlert, setFormAlert] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
      form.password.focus();

      if (err instanceof ApolloError) {
        setFormAlert(err.message);
      } else {
        setFormAlert('Something went wrong with your signup!');
      }

      setUserFormData({
        username: userFormData.username,
        password: '',
      });
    }
  };

  return (
    <article className="userForm">
      {/* This is needed for the validation functionality above */}
      <Form
        className="form-container-login shadow"
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
      >
        {/* show alert if server response is bad */}
        <Alert
          className="alert"
          dismissible
          onClose={() => setFormAlert('')}
          show={!!formAlert}
          variant="danger"
        >
          {formAlert}
        </Alert>
        <Form.Group className="form-title">
          <h4 className="title-signup">Sign Up</h4>
          <p className="subTitle">
            Sign up with Reminder Nurse to stay on top of your daily
            medications.
          </p>
          <Form.Label className="label-usrName" htmlFor="username">
            Username
          </Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="👤 Type your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-title">
          <Form.Label className="label-usrName" htmlFor="password">
            Password
          </Form.Label>
          <Form.Control
            className="form-input"
            type="password"
            placeholder="🔒 Type your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="form-submit-btn"
          disabled={
            !(userFormData.username && userFormData.password) || loading
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
        <Button className="switchClick" onClick={switchForm}>
          Already have an account?
        </Button>
      </Form>
    </article>
  );
};

export default SignupForm;
