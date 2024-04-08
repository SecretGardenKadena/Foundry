import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "./css/App.scss";
import "./index.css";
import { useEffect } from "react";

import Routing from "./routes/Routing";

function App() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Routing />
    </>
  )
}

export default App;
