import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DoctorProvider } from "./context/doctor";
import { PatientProvider } from "./context/patient";
import { BookingProvider } from "./context/booking";
import { SendmailProvider } from "./context/sendmail";
import { NotificationProvider } from "./context/notification";
import "bootstrap/dist/css/bootstrap.min.css";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
  <NotificationProvider>
    <SendmailProvider>
      <BookingProvider>
        <PatientProvider>
          <DoctorProvider>
            <React.Fragment>
              <App />
            </React.Fragment>
          </DoctorProvider>
        </PatientProvider>
      </BookingProvider>
    </SendmailProvider>
  </NotificationProvider>,
  document.getElementById("root")
);

reportWebVitals();
