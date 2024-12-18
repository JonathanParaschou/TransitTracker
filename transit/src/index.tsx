import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home.tsx';
import reportWebVitals from './reportWebVitals.ts';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Navbar> 
    <Container>
      <Navbar.Brand><img className='circle-image' src="/logo.png" alt="TransitTracker Logo" style={{ maxWidth: '20%', maxHeight: '100%', objectFit: 'contain' }} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
    </Container>
  </Navbar>
  <div className="containerdrop">
    <Home />
  </div>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
