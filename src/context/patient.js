import React, { useEffect, useState,useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  updatePatient,
    createPatient,
    deletePatient
  } from "../graphql/mutations";
  import {
    listPatients,getPatient
  } from "../graphql/queries";
  import { NotificationContext } from "./notification";
const PatientContext = React.createContext();
const initialState = { name: "", email: "", description: "" };
const editState = { name: "", email: "", description: "" };
const PatientProvider = ({ children }) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const{showSuccess,showError}=useContext(NotificationContext)
    const [patient, setpatient] = useState([]);

    const [formEditPatient, setEditFormPatient] = useState(editState);
    const [formPatient, setFormPatient] = useState(initialState);

    useEffect(() => {
        fetchpatient();
      }, []);
      function setInputPatient(key, value) {
        setFormPatient({ ...formPatient, [key]: value });
      }
      function setInputEditPatient(key, value) {
        setEditFormPatient({ ...formEditPatient, [key]: value });
      }
      const getPatientByid=async(id)=> {
        toggle();
        try {
          const todoData = await API.graphql(
            graphqlOperation(getPatient, { id: id })
          );
          const doctor = todoData.data.getPatient;
          setEditFormPatient(doctor);
        } catch (err) {
          console.log("error fetching doctor by id:"+err);
        }
      }
  async function fetchpatient() {
    try {
      const todoData = await API.graphql(graphqlOperation(listPatients));
      const patient = todoData.data.listPatients.items;
      setpatient(patient);
    } catch (err) {
      console.log("error fetching patient:"+err);
    }
  }

  async function addPatient() {
    try {
      if (!formPatient.name || !formPatient.email || !formPatient.description)
        return;
      const todo = { ...formPatient };
      setpatient([...patient, todo]);
      setFormPatient(initialState);
      await API.graphql(graphqlOperation(createPatient, { input: todo }));
      fetchpatient();
      showSuccess()
    } catch (err) {
      showError()
      console.log("error creating patient:", err);
    }
  }
  const editPatient=async()=> {
    try {
      if (!formEditPatient.name || !formEditPatient.email || !formEditPatient.description) return;
      const todo = { id:formEditPatient.id,name:formEditPatient.name,email:formEditPatient.email,description:formEditPatient.description };
      console.log(todo)
      await API.graphql(graphqlOperation(updatePatient, { input: todo }));
      fetchpatient();
      toggle()
      showSuccess();
    } catch (err) {
      showError()
      console.log("error editting patient:", err);
    }
  }
  async function removePatient(id) {
    console.log(id);
    const id1 = {
      id: id,
    };
    try {
      await API.graphql(graphqlOperation(deletePatient, { input: id1 }));
      const i = patient.filter((value, index, arr) => {
        return value.id !== id;
      });
      showSuccess()
      setpatient(i);
    } catch (err) {
      showError()
      console.log("error delete doctor:", err);
    }
  }
  return (
    <PatientContext.Provider value={{formEditPatient,patient, formPatient,toggle,modal,getPatientByid, setInputPatient, addPatient, removePatient,setInputEditPatient,editPatient}}>
        {children}
    </PatientContext.Provider>
  );
};

export { PatientContext, PatientProvider };
