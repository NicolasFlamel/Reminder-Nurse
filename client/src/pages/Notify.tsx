import Notifications from 'utils/Notifications';
import { Button, Container } from 'react-bootstrap';

const Notify = () => {
  const testNotification = () =>
    Notifications.createNotification('time', 'name');

  return (
    <Container>
      <h2>Test if notifications work here</h2>
      <Button onClick={testNotification}>Click me</Button>
    </Container>
  );
};

export default Notify;
