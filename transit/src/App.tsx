import React, { useState, useEffect } from 'react';
import './App.css';
import Dropdown from './Components/DropDown.tsx';
import axios from 'axios';
import { RouteOptions, DirectionOptions, StopOptions, AppState } from './Interfaces/Interfaces.ts'
import BootstrapDropdown from './Components/DropDown.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let defaultRouteOptions = [{value: "N/A", label: "Select Route"}];
  let defaultDirectionOptions = [{value: "N/A", label: "Select Direction"}];
  let defaultStopOptions = [{value: "N/A", label: "Select Stop"}];
  const [state, setState] = useState<AppState>({
    routeOptions: defaultRouteOptions,
    directionOptions: defaultDirectionOptions ,
    stopOptions: defaultStopOptions,
    selectedRoute: null,
    selectedDirection: null,
    selectedStop: null,
    error: null,
  });

  useEffect(() => {
    const fetchRouteOptions = async () => {
      try {
        const response = await axios.get('https://svc.metrotransit.org/nextrip/routes');
        let responseData: RouteOptions[] = defaultRouteOptions;
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

    const fetchDirectionOptions = async (routeId) => {
      try {
        if (routeId != "N/A") {
          const response = await axios.get(`https://svc.metrotransit.org/nextrip/directions/${routeId}`);
          let responseData: DirectionOptions[] = defaultDirectionOptions;
          response.data.forEach((data) => {
            let obj = {
              label: data.direction_name,
              value: data.direction_id
            }
            responseData.push(obj);
          })
          setState((prevState) => ({ ...prevState, directionOptions: responseData, stopOptions: defaultStopOptions }));
        } else {
          setState((prevState) => ({ ...prevState, directionOptions: [{ value: "N/A", label: "Select Direction" }], stopOptions: [{ value: "N/A", label: "Select Stop" }]}));
        }
      } catch (error) {
        console.error('Error fetching direction options:', error);
        setState((prevState) => ({ ...prevState, error: 'Failed to load direction options' }));
      }
    }

    const fetchStopOptions = async (routeId, directionId) => {
      try {
        if (routeId != "N/A" && directionId != "N/A") {
          const response = await axios.get(`https://svc.metrotransit.org/nextrip/stops/${routeId}/${directionId}`);
          let responseData: StopOptions[] = defaultStopOptions;
          response.data.forEach((data) => {
            let obj = {
              label: data.description,
              value: data.place_code
            }
            responseData.push(obj);
          })
          setState((prevState) => ({ ...prevState, stopOptions: responseData }));
        } else {
          setState((prevState) => ({ ...prevState, stopOptions: [{ value: "N/A", label: "Select Stop" }]}));
        }
      } catch (error) {
        console.error('Error fetching stop options:', error);
        setState((prevState) => ({ ...prevState, error: 'Failed to load stop options' }));
      }
    }

    if (state.routeOptions.length == 1) {
      fetchRouteOptions();
    }

    if (state.selectedRoute && state.directionOptions.length == 1) {
      fetchDirectionOptions(state.selectedRoute);
    }

    if (state.selectedRoute && state.selectedDirection && state.stopOptions.length == 1) {
      fetchStopOptions(state.selectedRoute, state.selectedDirection)
    }
  }, [state.selectedRoute, state.selectedDirection, state.selectedStop]);

  const handleRouteChange = (route) => {
    setState((prevState) => ({
      ...prevState,
      selectedRoute: route,
      directionOptions: defaultDirectionOptions,
      stopOptions: defaultStopOptions,
      selectedDirection: null,
      selectedStop: null
    }));
  };

  const handleDirectionChange = (direction) => {
    setState((prevState) => ({
      ...prevState,
      selectedDirection: direction,
      stopOptions: defaultStopOptions,
      selectedStop: null
    }));
  };

  const handleStopChange = (stop) => {
    setState((prevState) => ({
      ...prevState,
      selectedStop: stop,
    }));
  };

  return (
    <div className="RouteFinder">
          <BootstrapDropdown
            options={state.routeOptions}
            onSelect={handleRouteChange}
            defaultVal="Select Route"
          />
          <Dropdown
            options={state.directionOptions}
            onSelect={handleDirectionChange}
            defaultVal="Select Direction"
          />
          <Dropdown
            options={state.stopOptions}
            onSelect={handleStopChange}
            defaultVal="Select Stop"
          />
    </div>
  );
}

export default App;