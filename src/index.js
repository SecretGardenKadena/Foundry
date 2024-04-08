import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AnimatedCursor from "react-animated-cursor";
import { StyledEngineProvider } from '@mui/material/styles';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import Store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <AnimatedCursor 
        style={{ zIndex: 40 }}
        innerSize={25}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          border: '3px solid var(--cursor-color)',
        }}
        innerStyle={{
          backgroundColor: 'var(--cursor-color)'
        }}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
      />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
