import './App.css';
import Doctor from "./components/Doctor/Doctor";
import Patient from "./components/Patient/Patient";
import Booking from "./components/Booking/Booking";
import SendMail from "./components/SendMail/SendMail";
import ReactNotification from 'react-notifications-component'
import React, {  useState} from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div></div>,
      main: () => (<Doctor text="Doctor"/>),
    },
    {
      path: "/patient",
      sidebar: () => <div></div>,
      main: () => (<Patient text="Patient"/>),
    },
    {
      path: "/booking",
      sidebar: () => <div></div>,
      main: () => (<Booking text="Booking"/>),
    },
    {
      path: "/sendmail",
      sidebar: () => <div></div>,
      main: () => (<SendMail text="Send Mail"/>),
    },
  ];
  const [isOpen, setIsOpen] = useState(true);

  const toggleHome = () => setIsOpen(!isOpen);

  return (
    <>
    <ReactNotification />
      <Navbar  color="success"  light expand="md">
        <NavbarToggler onClick={toggleHome} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Doctor</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/patient">Patient</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/booking">Booking</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/sendmail">Send mail</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={route.main}
            />
          ))}
        </Switch>
      </Router>
    </>
  );
};
export default App;
