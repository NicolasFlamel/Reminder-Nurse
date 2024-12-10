import { Daily } from 'pages';
import { Access } from 'components';
import { AccessType } from 'types';

interface HomeProps {
  access: AccessType;
}
export const Home = ({ access }: HomeProps) => {
  return access.loggedIn ? <Daily /> : <Access access={access} />;
};
