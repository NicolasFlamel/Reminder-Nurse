import { useQuery } from '@apollo/client';
import { QUERY_MEDICINE } from 'utils/queries';
import { useParams, Navigate } from 'react-router-dom';
import { Medication } from 'components';
import { MedicineQueryType } from 'types';

// page to edit a medicine path="/medicine/:medicineId"
export const Medicine = () => {
  const { medicineId } = useParams();
  const { loading, data } = useQuery<MedicineQueryType>(QUERY_MEDICINE, {
    variables: { medicineId },
  });

  if (loading) return <h2>Loading...</h2>;

  return (
    <section className="edit-medication">
      <h2 className="dmedHeader">Medication Information</h2>
      {/* if route has proper id or add load edit or add */}
      {data || medicineId === 'add' ? (
        data ? (
          <Medication medicine={data.medicine} />
        ) : (
          <Medication />
        )
      ) : (
        <Navigate to="../medicines" />
      )}
    </section>
  );
};
