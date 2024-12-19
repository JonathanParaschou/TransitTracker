import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 TransitTracker. All rights reserved.</p>
            <p>
              <a href="#privacy" className="footer-link">Privacy Policy</a> | 
              <a href="#terms" className="footer-link"> Terms of Service</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
