import './styles.css';
import { DailySummary } from 'components';
import rnStatic from 'assets/images/rn_static_01.png';

// Daily section of homepage
export const Daily = () => {
  return (
    <section>
      <div>
        <h2 className="dmedHeader">Daily Medication</h2>
        <center>
          <section className="row dTop">
            <div className="imgContain col-5">
              <img
                src={rnStatic}
                className="imgNurse"
                alt="Icon of the Reminder Nurse"
              />
            </div>
            <div className="col-5 animate__animated animate__fadeIn">
              <article className="card dailyDialogue border-0 shadow-sm">
                <div className="card-body">
                  Let's look at your medications today.
                </div>
              </article>
            </div>
          </section>
        </center>
        <DailySummary />
      </div>
    </section>
  );
};
