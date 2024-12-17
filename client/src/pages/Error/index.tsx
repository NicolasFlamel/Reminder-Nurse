import { CSSProperties } from 'react';

interface ErrorPops {
  error?: unknown;
}

export const ErrorPage = ({ error }: ErrorPops) => {
  const styles: CSSProperties = { display: 'flex', justifyContent: 'center' };

  console.error(error);

  return (
    <section style={styles}>
      <h1>Oops, Something went wrong</h1>
    </section>
  );
};
