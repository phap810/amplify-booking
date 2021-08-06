import React, { useContext } from "react";
import { DoctorContext } from "../../context/doctor";
import { PatientContext } from "../../context/patient";
import { BookingContext } from "../../context/booking";
import {
  Container,
  Button,
  Form,
  Table,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
const Booking = (props) => {
  const { doctor } = useContext(DoctorContext);
  const { patient } = useContext(PatientContext);
  const {
    formBooking,
    setInputBooking,
    addBooking,
    removeBooking,
    booking,
    modal,
    toggle,
    getBookingByid,
    editBooking,
    formEditBooking,
    setInputEditBooking,
  } = useContext(BookingContext);
  return (
    <Container>
      <Modal isOpen={modal} toggle={toggle} className="Show">
        <ModalHeader toggle={toggle}>{props.text}</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup className="mb-4">
              <Input
                value={formEditBooking.doctor}
                onChange={(event) =>
                  setInputEditBooking("doctor", event.target.value)
                }
                type="select"
                name="select"
                id="exampleSelect"
              >
                <option>Choose Doctor</option>
                {doctor.map((todo, index) => (
                  <option key={todo.id ? todo.id : index} value={todo.email}>
                    {todo.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="mb-4">
              <Input
                onChange={(event) =>
                  setInputEditBooking("patient", event.target.value)
                }
                value={formEditBooking.patient}
                type="select"
                name="select"
                id="exampleSelect"
              >
                <option>Choose Patient</option>
                {patient.map((todo, index) => (
                  <option key={todo.id ? todo.id : index} value={todo.email}>
                    {todo.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="mb-4">
              <Input
                type="datetime-local"
                value={formEditBooking.datetime}
                placeholder="Datetime"
                onChange={(event) =>
                  setInputEditBooking("datetime", event.target.value)
                }
              />
              <br />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={editBooking}>Edit doctor</Button>
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
              value={formBooking.doctor}
              onChange={(event) =>
                setInputBooking("doctor", event.target.value)
              }
              type="select"
              name="select"
              id="exampleSelect"
            >
              <option>Choose Doctor</option>
              {doctor.map((todo, index) => (
                <option key={todo.id ? todo.id : index} value={todo.email}>
                  {todo.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup className="mb-4">
            <Input
              onChange={(event) =>
                setInputBooking("patient", event.target.value)
              }
              value={formBooking.patient}
              type="select"
              name="select"
              id="exampleSelect"
            >
              <option>Choose Patient</option>
              {patient.map((todo, index) => (
                <option key={todo.id ? todo.id : index} value={todo.email}>
                  {todo.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup className="mb-4">
            <Input
              type="datetime-local"
              value={formBooking.datetime}
              placeholder="Datetime"
              onChange={(event) =>
                setInputBooking("datetime", event.target.value)
              }
            />
            <br />
          </FormGroup>
          <Button color="success" onClick={addBooking}>{props.text}</Button>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Datetime</th>
            <th colSpan="2" style={{ textAlign: "center", verticalAlign: "middle" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((todo, index) => (
            <tr key={todo.id ? todo.id : index}>
              <th scope="row">#</th>
              <td>{todo.patient}</td>
              <td>{todo.doctor}</td>
              <td>{todo.datetime}</td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Button color="danger" onClick={() => getBookingByid(todo.id)}>
                  edit
                </Button>
              </td>
              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Button color="danger" onClick={() => removeBooking(todo.id)}>delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Booking;
