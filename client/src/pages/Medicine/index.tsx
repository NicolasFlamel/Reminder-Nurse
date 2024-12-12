import './styles.css';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINE } from 'utils/queries';
import { useParams, Navigate } from 'react-router-dom';
import { Loading, Medication } from 'components';
import { MedicineQueryType } from 'types';
import { ErrorPage } from 'pages/Error';

// page to edit a medicine path="/medicine/:medicineId"
export const Medicine = () => {
  const { medicineId } = useParams();

  if (!medicineId) return <Navigate to="../medicines" />;

  return (
    <section className="edit-medication">
      <h2 className="dmedHeader">Medication Information</h2>
      {medicineId === 'add' ? (
        <Medication />
      ) : (
        <EditMedicine medicineId={medicineId} />
      )}
    </section>
  );
};

interface EditMedicineProps {
  medicineId: string;
}
const EditMedicine = ({ medicineId }: EditMedicineProps) => {
  const { loading, data, error } = useQuery<MedicineQueryType>(QUERY_MEDICINE, {
    variables: { medicineId },
  });

  if (loading) return <Loading />;
  else if (error) return <ErrorPage error={error} />;
  else if (!data) return <ErrorPage error={'No data found'} />;

  return <Medication medicine={data.medicine} />;
};
