import './styles.css';
import { useRef, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import LoginForm from './Login';
import Signup from './Signup';
import { AccessType } from 'types';

interface AccessProps {
  access: AccessType;
}
export const Access = ({ access: { setLoggedIn } }: AccessProps) => {
  const login = useRef(null);
  const signup = useRef(null);
  const [showLoginForm, setShowLoginForm] = useState(0);
  const nodeRef = showLoginForm ? login : signup;

  const switchForm = () => {
    setShowLoginForm((prev) => prev + 1);
  };

  return (
    <section className="LandingContain">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={showLoginForm}
          timeout={500}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <article ref={nodeRef}>
            {showLoginForm ? (
              <LoginForm switchForm={switchForm} setLoggedIn={setLoggedIn} />
            ) : (
              <Signup switchForm={switchForm} setLoggedIn={setLoggedIn} />
            )}
          </article>
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
};

export default Access;
