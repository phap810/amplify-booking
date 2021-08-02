import React, { useState,useContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { sendMail } from "../graphql/mutations";
import { NotificationContext } from "./notification";
const SendmailContext = React.createContext()

const bookingState = { patient: "", doctor: "", datetime: "" };
const SendmailProvider = ({children}) => {
  const{showSuccess,showError}=useContext(NotificationContext)
    const [formSend, setformSend] = useState(bookingState);

    const [sendmail, setsendmail] = useState([]);

    async function sendMailStrap() {
        var date = new Date(formSend.datetime);
        formSend.datetime = date.toISOString();
        try {
          if (!formSend.patient || !formSend.doctor || !formSend.datetime) return;
          const todo = { ...formSend };
          console.log(formSend);
          setsendmail([...sendmail, todo]);
          setformSend(bookingState);
    
          var a = JSON.stringify(todo);
          console.log(a);
          await API.graphql(graphqlOperation(sendMail, { data: a }));
          showSuccess()
          console.log("success");
        } catch (err) {
          showError()
          console.log("error send mail:", err);
        }
      }
    
      function setInputSend(key, value) {
        setformSend({ ...formSend, [key]: value });
      }

  return (
  <SendmailContext.Provider value={{formSend, setInputSend, sendMailStrap}}>
      {children}
  </SendmailContext.Provider>
  );
};

export {SendmailContext,SendmailProvider};
