import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { TOGGLE_ACTIVE } from 'utils/mutations';
import { toggleIsActiveCache } from 'utils/handleCache';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { MedicineType } from 'types';
import { MouseEvent } from 'react';

interface MedicationListProps {
  medicines: MedicineType[];
  isActive: boolean;
}
export const MedicationList = ({
  medicines,
  isActive,
}: MedicationListProps) => {
  const [toggleIsActive] = useMutation(TOGGLE_ACTIVE, toggleIsActiveCache);

  const handleMedicineToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const medicineId = e.currentTarget.id;
      await toggleIsActive({ variables: { medicineId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ol className="medication-list display-flex flex-wrap justify-content-between MedContMob">
      {medicines.map((medicine) =>
        isActive === medicine.isActive ? (
          <li key={medicine._id} style={{ listStyleType: 'none' }}>
            <section className="m-1 display-flex justify-content-around flex-wrap">
              <h3 className="MedName">{medicine.name}</h3>
              <section className="d-flex m-1 flex-wrap justify-content-end">
                <Link to={'../medicine/' + medicine._id}>
                  <FontAwesomeIcon
                    icon={faFilePen}
                    className="fa-xl MedFAIcon MedToggleB"
                  />
                </Link>
                <Button
                  className="MedToggleB"
                  onClick={handleMedicineToggle}
                  id={medicine._id}
                  disabled={medicine.amount > 0 ? false : true}
                >
                  <FontAwesomeIcon
                    icon={isActive ? faTrashCan : faCirclePlus}
                    className="fa-xl fa-regular MedFAIcon"
                  />
                </Button>
              </section>
            </section>
          </li>
        ) : null
      )}
    </ol>
  );
};

export default MedicationList;
