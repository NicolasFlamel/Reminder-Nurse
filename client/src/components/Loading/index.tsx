import './styles.css';
import { CSSProperties, ReactNode } from 'react';

export const Loading = () => {
  const styles: CSSProperties = { display: 'flex', justifyContent: 'center' };

  return (
    <section style={styles}>
      <h1>Loading</h1>
    </section>
  );
};

interface LoadingMedicationListProps {
  children?: ReactNode;
}

export const LoadingMedicationList = ({
  children,
}: LoadingMedicationListProps) => {
  return (
    <div className="loading-medication-list">
      <div className="loading-spinner">
        <p className="spinner-text">{children ? children : 'Loading...'}</p>
      </div>
    </div>
  );
};
