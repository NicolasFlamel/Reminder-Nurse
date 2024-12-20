import { useMutation } from '@apollo/client';
import { TOGGLE_CHECKED } from 'utils/mutations';
import { toggledQueueCheckedCache } from 'utils/handleCache';
import { CurrentMedicine, MedicineType } from 'types';

type MutationType = { checkQueue: MedicineType };
interface DailyMedicationProps {
  medicine: CurrentMedicine;
}
export const DailyMedication = ({ medicine }: DailyMedicationProps) => {
  const [toggleChecked] = useMutation<MutationType>(
    TOGGLE_CHECKED,
    toggledQueueCheckedCache
  );

  const handleCheck = async () => {
    const medicineId = medicine._id;
    const queueId = medicine.current._id;
    await toggleChecked({ variables: { medicineId, queueId } });
  };

  return (
    <section className="row">
      <article className="card-body px-4 pt-1 col-7 ">
        <h3 className="dailyHeader">{medicine.name}</h3>
        <hr />
        <p className="dailystext">
          Take {medicine.dosage} dosage at {medicine.current.time}.
        </p>
        <p className="dailyRemain">
          You have {medicine.amount} remaining dosages.
        </p>
      </article>
      <aside className="col">
        <div className="form-check">
          <input
            onChange={handleCheck}
            checked={medicine.current.checked}
            disabled={medicine.current.checked}
            className="form-check-input dailyCheck"
            type="checkbox"
          />
        </div>
      </aside>
    </section>
  );
};

export default DailyMedication;
