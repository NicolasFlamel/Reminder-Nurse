import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from 'utils/queries';
import { CurrentMedicine, MedicinesQueryType } from 'types';
import { ErrorPage } from 'pages/Error';
import { DailyMedication, Loading } from 'components';

// TODO: add logic for checkboxes / boolean
export const DailySummary = () => {
  const sortedMedicine: CurrentMedicine[] = [];
  // change query to all for caching purposes, handle isActive logic on this end
  const { loading, data, error } =
    useQuery<MedicinesQueryType>(QUERY_MEDICINES);

  if (loading) return <Loading />;
  else if (error || !data?.medicines) {
    console.error(error);
    return <ErrorPage error={error} />;
  }

  const activeMedicines = data.medicines.filter(
    (medicine) => medicine.isActive
  );

  activeMedicines.forEach((med) => {
    med.queue.forEach((timeObj) => {
      sortedMedicine.push({ ...med, current: timeObj });
    });
  });

  sortedMedicine.sort((a, b) => {
    const timeA = parseInt(
      a.current.time[0] +
        a.current.time[1] +
        a.current.time[3] +
        a.current.time[4]
    );
    const timeB = parseInt(
      b.current.time[0] +
        b.current.time[1] +
        b.current.time[3] +
        b.current.time[4]
    );
    return timeA - timeB;
  });

  return (
    <ul className="d-flex flex-wrap justify-content-around dCardMob">
      {sortedMedicine.length ? (
        sortedMedicine.map((medicine) => (
          <li
            key={medicine.current._id}
            className="card shadow m-2 p-3 mb-4 bg-white rounded dailyCard"
          >
            <DailyMedication medicine={medicine} />
          </li>
        ))
      ) : (
        <h2>You do not have any medication for today. </h2>
      )}
    </ul>
  );
};
