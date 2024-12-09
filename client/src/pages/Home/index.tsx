import { Daily } from 'pages';
import { Access } from 'components';

export const Home = ({ access: { loggedIn, setLoggedIn } }) => {
  return loggedIn ? <Daily /> : <Access access={{ setLoggedIn }} />;
};
