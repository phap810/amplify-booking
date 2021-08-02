import React, { useEffect, useState,useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
    createDoctor,
    deleteDoctor,
    updateDoctor
  } from "../graphql/mutations";
  import {
    listDoctors,
    getDoctor,
  } from "../graphql/queries";
import { NotificationContext } from "./notification";


const DoctorContext=React.createContext();

const initialState = { name: "", email: "", description: "" };
const editDoctorState = { id: "", name: "", email: "", description: "" };
const DoctorProvider = ({children}) => {
  const{showSuccess,showError}=useContext(NotificationContext)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
    const [formState, setFormState] = useState(initialState);
    const [formEditDoctor, setFormEditDoctor] = useState(editDoctorState);

    const [doctor, setdoctor] = useState([]);

    function setInputEditDoctor(key, value) {
        setFormEditDoctor({ ...formEditDoctor, [key]: value });
      }
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
      }

    useEffect(() => {
        fetchdoctor();
      }, []);

   const getDoctorByid=async(id)=> {
    toggle();
    try {
      const todoData = await API.graphql(
        graphqlOperation(getDoctor, { id: id })
      );
      const doctor = todoData.data.getDoctor;
      setFormEditDoctor(doctor);
      console.log(formEditDoctor.name)
    } catch (err) {
      console.log("error fetching doctor by id:"+err);
    }
  }
   const fetchdoctor=async()=> {
    try {
      const todoData = await API.graphql(graphqlOperation(listDoctors));
      const doctor = todoData.data.listDoctors.items;
      setdoctor(doctor);
    } catch (err) {
      console.log("error fetching doctor:"+err);
    }
  }

   const addDoctor=async()=> {
    try {
      if (!formState.name || !formState.email || !formState.description) return;
      const todo = { ...formState };
      setdoctor([...doctor, todo]);
      setFormState(initialState);
      await API.graphql(graphqlOperation(createDoctor, { input: todo }));
      fetchdoctor();
      showSuccess();
    } catch (err) {
      showError()
      console.log("error creating doctor:", err);
    }
  }
   const editDoctor=async()=> {
    try {
      if (!formEditDoctor.name || !formEditDoctor.email || !formEditDoctor.description) return;
      const todo = { id:formEditDoctor.id,name:formEditDoctor.name,email:formEditDoctor.email,description:formEditDoctor.description };
      console.log(todo)
      await API.graphql(graphqlOperation(updateDoctor, { input: todo }));
      fetchdoctor();
      toggle()
      showSuccess();
    } catch (err) {
      showError()
      console.log("error editting doctor:", err);
    }
  }
   const removeDoctor=async (id)=> {
    console.log(id);
    const id1 = {
      id: id,
    };
    try {
      await API.graphql(graphqlOperation(deleteDoctor, { input: id1 }));
      const i = doctor.filter((value, index, arr) => {
        return value.id !== id;
      });
      setdoctor(i);
      showSuccess();
    } catch (err) {
      showError()
      console.log("error delete doctor:", err);
    }
  }

    return (
        <DoctorContext.Provider value={{addDoctor,editDoctor,removeDoctor,getDoctorByid,setInputEditDoctor,toggle,setInput,
            doctor,formState,formEditDoctor,modal}}>
            {children}
        </DoctorContext.Provider>
    )
}

export {DoctorContext,DoctorProvider} 
