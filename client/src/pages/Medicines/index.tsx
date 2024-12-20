import './styles.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MEDICINES } from 'utils/queries';
import { LoadingMedicationList, MedicationList } from 'components';
import { Container, Button, Tab, Tabs } from 'react-bootstrap';
import rnStatic from 'assets/images/rn_static_01.png';
import { ErrorPage } from 'pages/Error';

// path="/medicines"
export const Medicines = () => {
  const { loading, data, error } = useQuery(QUERY_MEDICINES);

  if (error) return <ErrorPage error={error} />;

  return (
    <section className="MedBottom">
      <h2 className="dmedHeader">Your Medications</h2>
      <center>
        <article className="row dTop">
          <figure className="imgContain col-5">
            <img
              src={rnStatic}
              className="imgNurse"
              alt="Icon of the Reminder Nurse"
            />
          </figure>
          <section className="col-5 animate__animated animate__fadeIn">
            <div className="card dailyDialogue border-0 shadow-sm">
              <div className="card-body">Need to edit your medications?</div>
            </div>
          </section>
        </article>
      </center>
      <Container className="container-fluid pl-4">
        <section className="medicines">
          <Tabs
            defaultActiveKey="active"
            id="active-inactive-medication"
            justify
          >
            <Tab eventKey="active" title="Active Medication">
              {loading ? (
                <LoadingMedicationList>Loading medicines</LoadingMedicationList>
              ) : (
                <MedicationList medicines={data.medicines} isActive={true} />
              )}
            </Tab>
            <Tab eventKey="inactive" title="Inactive Medication">
              {loading ? (
                <LoadingMedicationList>Loading medicines</LoadingMedicationList>
              ) : (
                <MedicationList medicines={data.medicines} isActive={false} />
              )}
            </Tab>
          </Tabs>
          <section className="d-flex flex-wrap justify-content-center">
            <Link to="../medicine/add">
              <Button
                className="form-submit-btn rounded-pill MedAddM"
                variant="primary"
                type="submit"
              >
                Add Medication
              </Button>
            </Link>
          </section>
        </section>
      </Container>
    </section>
  );
};
