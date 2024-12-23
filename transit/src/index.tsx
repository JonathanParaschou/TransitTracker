import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import Home from './Home.tsx';
import reportWebVitals from './reportWebVitals.ts';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Footer from './Components/Footer.tsx';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar expand="lg" className="navbar"> 
      <Container>
        <Navbar.Brand>
          <img 
            className="circle-image" 
            src="/logo.png" 
            alt="TransitTracker Logo" 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="navthing">
            <Nav.Link href="/" className="nav-link">About</Nav.Link>
            <Nav.Link href="/" className="nav-link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      <div className="containerdrop">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
