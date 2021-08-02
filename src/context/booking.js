import React, { useEffect, useState,useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createBooking, deleteBooking, updateBooking } from "../graphql/mutations";
import { listBookings,getBooking } from "../graphql/queries";
import { NotificationContext } from "./notification";
const BookingContext = React.createContext();
const bookingState = { patient: "", doctor: "", datetime: "" };
const bookingEditState = { patient: "", doctor: "", datetime: "" };
const BookingProvider = ({ children }) => {
  const{showSuccess,showError}=useContext(NotificationContext)

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formBooking, setFormBooking] = useState(bookingState);
  const [formEditBooking, setFormEditBooking] = useState(bookingEditState);

  const [booking, setbooking] = useState([]);

  function setInputBooking(key, value) {
    setFormBooking({ ...formBooking, [key]: value });
  }
  function setInputEditBooking(key, value) {
    setFormEditBooking({ ...formEditBooking, [key]: value });
  }
  useEffect(() => {
    fetchbooking();
  }, []);
  const getBookingByid=async(id)=> {
    toggle();
    try {
      const todoData = await API.graphql(
        graphqlOperation(getBooking, { id: id })
      );
      const doctor = todoData.data.getBooking;
      setFormEditBooking(doctor);
    } catch (err) {
      console.log("error fetching booking by id:"+err);
    }
  }
  async function addBooking() {
    try {
      if (!formBooking.patient || !formBooking.doctor || !formBooking.datetime)
        return;
      const todo = { ...formBooking };
      setbooking([...booking, todo]);
      setFormBooking(bookingState);
      await API.graphql(graphqlOperation(createBooking, { input: todo }));
      fetchbooking();
      showSuccess()
    } catch (err) {
      showError()
      console.log("error creating booking:", err);
    }
  }
  const editBooking=async()=> {
    try {
      if (!formEditBooking.patient || !formEditBooking.doctor || !formEditBooking.datetime) return;
      const todo = { id:formEditBooking.id,patient:formEditBooking.patient,doctor:formEditBooking.doctor,datetime:formEditBooking.datetime };
      console.log(todo)
      await API.graphql(graphqlOperation(updateBooking, { input: todo }));
      fetchbooking();
      toggle()
      showSuccess();
    } catch (err) {
      showError()
      console.log("error editting booking:", err);
    }
  }
  //fetch booking
  async function fetchbooking() {
    try {
      const todoData = await API.graphql(graphqlOperation(listBookings));
      const booking = todoData.data.listBookings.items;
      setbooking(booking);
    } catch (err) {
      console.log("error fetching booking:" + err);
    }
  }
  //delete booking
  async function removeBooking(id) {
    console.log(id);
    const id1 = {
      id: id,
    };
    try {
      await API.graphql(graphqlOperation(deleteBooking, { input: id1 }));
      const i = booking.filter((value, index, arr) => {
        return value.id !== id;
      });
      setbooking(i);
      showSuccess()
    } catch (err) {
      showError()
      console.log("error delete booking:", err);
    }
  }
  return (
    <BookingContext.Provider
      value={{
        formBooking,
        setInputBooking,
        addBooking,
        removeBooking,
        booking,toggle,modal,getBookingByid,editBooking,formEditBooking,setInputEditBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export {BookingContext,BookingProvider};
