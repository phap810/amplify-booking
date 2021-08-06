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
const Patient = (props) => {
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
        <ModalHeader toggle={toggle}>{props.text}</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup className="mb-4">
              <Input
                value={formEditPatient.name}
                placeholder="Name"
                onChange={(event) =>
                  setInputEditPatient("name", event.target.value)
                }
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <Input
                value={formEditPatient.email}
                placeholder="Email"
                onChange={(event) =>
                  setInputEditPatient("email", event.target.value)
                }
              />
            </FormGroup>
            <FormGroup className="mb-4">
              <Input
                value={formEditPatient.description}
                placeholder="Description"
                onChange={(event) =>
                  setInputEditPatient("description", event.target.value)
                }
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button outline color="success" onClick={editPatient}>Edit {props.text}</Button>
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <div>
        <h2 className="mb-4">{props.text} Management</h2>
        <Form>
          <FormGroup className="mb-4">
            <Input 
              value={formPatient.name}
              placeholder="Name"
              onChange={(event) => setInputPatient("name", event.target.value)}
            />
            
          </FormGroup>
          <FormGroup className="mb-4">
            <Input
              value={formPatient.email}
              placeholder="Email"
              onChange={(event) => setInputPatient("email", event.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Input
              value={formPatient.description}
              placeholder="Description"
              onChange={(event) =>
                setInputPatient("description", event.target.value)
              }
            />
            <br />
          </FormGroup>
          <Button color="success" onClick={addPatient}>Add {props.text}</Button>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
            <th colSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patient.map((todo, index) => (
            <tr key={todo.id ? todo.id : index}>
              <th scope="row">#</th>
              <td>{todo.name}</td>
              <td>{todo.email}</td>
              <td>{todo.description}</td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Button color="danger" onClick={() => getPatientByid(todo.id)}>
                  edit
                </Button>
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
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
