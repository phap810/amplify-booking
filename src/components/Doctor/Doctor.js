import React, { useContext } from "react";
import { DoctorContext } from "../../context/doctor";
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
const Doctor = (props) => {
  const {
    editDoctor,
    formEditDoctor,
    setInputEditDoctor,
    getDoctorByid,
    modal,
    toggle,
    doctor,
    formState,
    setInput,
    addDoctor,
    removeDoctor,
  } = useContext(DoctorContext);
  return (
    <Container>
      <Modal isOpen={modal} toggle={toggle} className="Show">
        <ModalHeader toggle={toggle}>{props.text}</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
              <Input
                value={formEditDoctor.name}
                placeholder="Name"
                onChange={(event) =>
                  setInputEditDoctor("name", event.target.value)
                }
              />
              <br />
            </FormGroup>
            <FormGroup>
              <Input
                value={formEditDoctor.email}
                placeholder="Email"
                onChange={(event) =>
                  setInputEditDoctor("email", event.target.value)
                }
              />
              <br />
            </FormGroup>
            <FormGroup>
              <Input
                value={formEditDoctor.description}
                placeholder="Description"
                onChange={(event) =>
                  setInputEditDoctor("description", event.target.value)
                }
              />
              <br />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={editDoctor}>Edit {props.text}</Button>
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <div>
        <h2>{props.text} Management</h2>
        <br />
        <Form>
          <FormGroup>
            <Input
              name="name"
              value={formState.name}
              placeholder="Name"
              onChange={(event) => setInput("name", event.target.value)}
            />
            <br />
          </FormGroup>
          <FormGroup>
            <Input
              name="email"
              value={formState.email}
              placeholder="Email"
              onChange={(event) => setInput("email", event.target.value)}
            />
            <br />
          </FormGroup>
          <FormGroup>
            <Input
              name="description"
              value={formState.description}
              placeholder="Description"
              onChange={(event) => setInput("description", event.target.value)}
            />
            <br />
          </FormGroup>
          <Button className="mb-4" color="success" onClick={addDoctor}>Add {props.text}</Button>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
            <th colSpan="2" style={{textAlign: "center", verticalAlign: "middle"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctor.map((todo, index) => (
            <tr key={todo.id ? todo.id : index}>
              <th scope="row">#</th>
              <td>{todo.name}</td>
              <td>{todo.email}</td>
              <td>{todo.description}</td>
                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                  <Button color="danger" onClick={() => getDoctorByid(todo.id)}>
                    edit
                  </Button>
                </td>
                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                  <Button color="danger" onClick={() => removeDoctor(todo.id)}>
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

export default Doctor;
