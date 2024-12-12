import { CSSProperties } from 'react';

export const Loading = () => {
  const styles: CSSProperties = { display: 'flex', justifyContent: 'center' };

  return (
    <section style={styles}>
      <h1>Loading</h1>
    </section>
  );
};
