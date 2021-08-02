import React, { useContext } from "react";
import { PatientContext } from "../../context/patient";
import {
  Container,
  Button,
  Form,
  Table,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
const Patient = () => {
  const {
    patient,
    formPatient,
    setInputPatient,
    addPatient,
    removePatient,
    formEditPatient,
    getPatientByid,
    setInputEditPatient,
    editPatient,
    toggle,
    modal,
  } = useContext(PatientContext);
  return (
    <Container>
      <Modal isOpen={modal} toggle={toggle} className="Show">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
              <Input
                value={formEditPatient.name}
                placeholder="Name"
                onChange={(event) =>
                  setInputEditPatient("name", event.target.value)
                }
              />
              <br />
            </FormGroup>
            <FormGroup>
              <Input
                value={formEditPatient.email}
                placeholder="Email"
                onChange={(event) =>
                  setInputEditPatient("email", event.target.value)
                }
              />
              <br />
            </FormGroup>
            <FormGroup>
              <Input
                value={formEditPatient.description}
                placeholder="Description"
                onChange={(event) =>
                  setInputEditPatient("description", event.target.value)
                }
              />
              <br />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={editPatient}>Edit doctor</Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <div>
        <h2>Patient Management</h2>
        <br />
        <Form>
          <FormGroup>
            <Input
              value={formPatient.name}
              placeholder="Name"
              onChange={(event) => setInputPatient("name", event.target.value)}
            />
            <br />
          </FormGroup>
          <FormGroup>
            <Input
              value={formPatient.email}
              placeholder="Email"
              onChange={(event) => setInputPatient("email", event.target.value)}
            />
            <br />
          </FormGroup>
          <FormGroup>
            <Input
              value={formPatient.description}
              placeholder="Description"
              onChange={(event) =>
                setInputPatient("description", event.target.value)
              }
            />
            <br />
          </FormGroup>
          <Button onClick={addPatient}>Add patient</Button>
        </Form>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patient.map((todo, index) => (
            <tr key={todo.id ? todo.id : index}>
              <th scope="row">#</th>
              <td>{todo.name}</td>
              <td>{todo.email}</td>
              <td>{todo.description}</td>
              <td>
                <Button color="danger" onClick={() => getPatientByid(todo.id)}>
                  edit
                </Button>
                <Button color="danger" onClick={() => removePatient(todo.id)}>
                  delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Patient;
