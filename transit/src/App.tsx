import React, { useState, useEffect } from 'react';
import './App.css';
import Dropdown from './Components/DropDown.tsx';
import axios from 'axios';
import RouteOptions from './Interfaces/Interfaces.ts';

interface AppState {
  routeOptions: RouteOptions[];
  error: string | null;
}

function App(): React.FC<AppState> {
  const [state, setState] = useState<AppState>({
    routeOptions: [],
    error: null,
  });

  useEffect(() => {
    const fetchRouteOptions = async () => {
      try {
        const response = await axios.get('https://svc.metrotransit.org/nextrip/routes');
        let responseData: RouteOptions[] = [];
        response.data.forEach((data) => {
          let obj = {
            label: data.route_label,
            value: data.route_id
          }
          responseData.push(obj);
        })
        setState((prevState) => ({ ...prevState, routeOptions: responseData }));
      } catch (error) {
        console.error('Error fetching route options:', error);
        setState((prevState) => ({ ...prevState, error: 'Failed to load route options' }));
      }
    };

    fetchRouteOptions();
  }, []);

  return (
    <div className="Home">
      <Dropdown defaultValue={{ value: 'Select Route', label: 'Select Route' }} options={state.routeOptions} />
    </div>
  );
}

export default App;