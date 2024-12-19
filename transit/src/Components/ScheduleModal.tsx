import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { DepartureData, ModalState } from '../Interfaces/Interfaces';

const ScheduleModal = ({ show, onHide, tripInfo }) => {
    const [state, setState] = useState<ModalState>({
        stopId: null,
        departureData: []
    });

    // Update useEffect to run only when show changes and tripInfo.stop has a value
    useEffect(() => {
        const fetchStopId = async (tripInfo) => {
            try {
                const response = await axios.get(`https://svc.metrotransit.org/nextrip/${tripInfo.route}/${tripInfo.direction}/${tripInfo.stop}`);
                let stopId = response.data.stops[0].stop_id;
                let pickup = response.data.stops[0].description;
                let departures = response.data.departures;
                let departureDataWashed: DepartureData[] = [];
                departures.forEach(data => {
                    departureDataWashed.push({ route: data.route_short_name, arrival: pickup, destination: data.description, departs: data.departure_text });
                });
                setState((prevState) => ({ ...prevState, stopId: stopId, departureData: departureDataWashed }));
            } catch (error) {
                console.error('Error fetching stop data:', error);
            }
        };

        // Only call fetchStopId if show is true and tripInfo.stop has a value
        if (show && tripInfo.stop) {
            fetchStopId(tripInfo);
        }

        return () => {
          setState((prevState) => ({ ...prevState, departureData: [] }));
        };
    }, [show, tripInfo.stop]); // Include both show and tripInfo.stop in the dependency array

    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <div className="modal-title-container">
              <Modal.Title>STOP #{state.stopId}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            {state.departureData.length === 0 ? (
              <p>No Departures Scheduled</p>
            ) : (
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Pickup Stop</th>
                    <th>Departure</th>
                    <th>Final Stop</th>
                  </tr>
                </thead>
                <tbody>
                  {state.departureData.map((item) => (
                    <tr key={item.route}> {/* Added key prop for proper rendering */}
                      <td>{item.route}</td>
                      <td>{item.arrival}</td>
                      <td>{item.departs}</td>
                      <td>{item.destination}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
};

export default ScheduleModal;