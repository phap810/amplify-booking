import React from "react";
import { store } from 'react-notifications-component';
import 'animate.css'
import 'react-notifications-component/dist/theme.css'

const NotificationContext=React.createContext()
const NotificationProvider = ({children}) => {

    const showSuccess=()=>{
        store.addNotification({
          title: "Success!",
          message: "Action success",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
      }
      const showError=()=>{
        store.addNotification({
          title: "Error!",
          message: "Action not success",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true
          }
        });
      }
    return (
<NotificationContext.Provider value={{showSuccess,showError}}>
    {children}
</NotificationContext.Provider>
    )
}

export {NotificationProvider,NotificationContext}
