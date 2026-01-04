import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

// CSS
import "./css/sass-css/layout.css"
import "./css/sass-css/elements.css"

function App() {
  return (
    <>
      <div id="main">
        <div id="body">
          Hello World!        
        </div>
        <div id="menu">
          Hello World!
        </div>
        <div id="footer">
          <div className="footer-content">
            Made by the <a href="https://github.com/thetrollingwizard" >best dev on the planet</a>
          </div>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

