import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/sass-css/index.css'
import './css/flex.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='App'>
      <div className='large-container menu'>
        hello
      </div>
      <div className='large-container body'>
        world   
      </div>
    </div>
  </React.StrictMode>,
)

