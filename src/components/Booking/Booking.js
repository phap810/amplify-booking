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
const Booking = () => {
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
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
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
            <FormGroup>
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
            <FormGroup>
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
            <Button onClick={editBooking}>Edit doctor</Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <div>
        <h2>Booking</h2>
        <br />
        <Form>
          <FormGroup>
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
          <FormGroup>
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
          <FormGroup>
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

          <Button onClick={addBooking}>Booking</Button>
        </Form>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Datetime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((todo, index) => (
            <tr key={todo.id ? todo.id : index}>
              <th scope="row">#</th>
              <td>{todo.patient}</td>
              <td>{todo.doctor}</td>
              <td>{todo.datetime}</td>
              <td>
                <Button color="danger" onClick={() => getBookingByid(todo.id)}>
                  edit
                </Button>
                <Button onClick={() => removeBooking(todo.id)}>delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Booking;
