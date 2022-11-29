import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from "./Home";
import Annotate from "./Annotate";
import Predict from "./Predict";


export default function App() {
  const [showNav, setShowNav] = useState(true);
  return (
    <Router>
      <div className="main_container">
        {showNav ? (
          <header>
            <nav>
              <ul>
                <li>Services</li>
                <li>Expertise</li>
                <li>Equipe</li>
                <li>Contact</li>
                <li className="contact_menu">Prendre rendez-vous</li>
              </ul>
            </nav>
          </header>
        ) : undefined}
        <Routes>
            <Route path="/predict" element={<Predict funcNav={setShowNav}/>} />
            <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}


function Topics() {

  return (
    <div>
      <h2>Topics</h2>
    </div>
  );
}
