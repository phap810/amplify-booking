import React, { useContext } from "react";
import { DoctorContext } from "../../context/doctor";
import { PatientContext } from "../../context/patient";
import { SendmailContext } from "../../context/sendmail";
import { Container, Button, Form, Input, FormGroup } from "reactstrap";
const SendMail = (props) => {
  const { doctor } = useContext(DoctorContext);
  const { patient } = useContext(PatientContext);
  const { formSend, setInputSend, sendMailStrap } = useContext(SendmailContext);
  return (
    <Container>
      <div>
        <h2 className="mb-4">{props.text}</h2>
        <Form>
          <FormGroup className="mb-4">
            <Input
              value={formSend.doctor}
              onChange={(event) => setInputSend("doctor", event.target.value)}
              type="select"
              name="select"
              id="exampleSelect"
            >
              <option>Choose Doctor</option>
              {doctor.map((todo, index) => (
                <option key={todo.id ? todo.id : index} value={todo.email}>
                  {todo.email}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup className="mb-4">
            <Input
              onChange={(event) => setInputSend("patient", event.target.value)}
              value={formSend.patient}
              type="select"
              name="select"
              id="exampleSelect"
            >
              <option>Choose Patient</option>
              {patient.map((todo, index) => (
                <option key={todo.id ? todo.id : index} value={todo.email}>
                  {todo.email}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup className="mb-4">
            <Input
              type="datetime-local"
              value={formSend.datetime}
              placeholder="Datetime"
              onChange={(event) => setInputSend("datetime", event.target.value)}
            />
          </FormGroup>
          <Button color="success" onClick={sendMailStrap}>{props.text}</Button>
        </Form>
      </div>
    </Container>
  );
};

export default SendMail;
