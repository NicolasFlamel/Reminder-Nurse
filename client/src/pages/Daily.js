import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from '../utils/queries';
import DailyMedication from '../components/DailyMedication';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Daily = () => {
  const sortedMedicine = [];
  // change query to all for caching purposes, handle isActive logic on this end
  const { loading, data, error } = useQuery(QUERY_MEDICINES);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{console.log(error)}</h2>;

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
  // add logic for checkboxes / boolean

  return (
    <section>
      <Container>
        <div>
          <h2 className="dmedHeader">Daily Medication</h2>
          <ul className="d-flex flex-wrap justify-content-around">
            {sortedMedicine.length ? (
              sortedMedicine.map((medicine) => (
                <li
                  key={medicine._id + medicine.current._id}
                  className="card shadow m-5 p-2 mb-4 bg-white rounded dailyCard"
                >
                  <DailyMedication medicine={medicine} />
                </li>
              ))
            ) : (
              <h2>You do not have any medication for today. </h2>
            )}
          </ul>
        </div>
        {/* TODO: fix Link takes whole line in browser */}
        <Link to={'/medicines'}>
          <center>
            <Button className="btn-block shadow dBtn rounded-pill">
              Edit Medications
            </Button>
          </center>
        </Link>
      </Container>
    </section>
  );
};

export default Daily;
