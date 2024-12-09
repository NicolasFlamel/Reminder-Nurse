import Access from 'components/Access';
import { Daily } from 'pages';

export const Home = ({ access: { loggedIn, setLoggedIn } }) => {
  return loggedIn ? <Daily /> : <Access access={{ setLoggedIn }} />;
};
