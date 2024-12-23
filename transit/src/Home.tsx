import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { RouteOptions, DirectionOptions, StopOptions, AppState } from './Interfaces/Interfaces.ts';
import BootstrapDropdown from './Components/DropDown.tsx';
import ScheduleModal from './Components/ScheduleModal.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRoute, FaArrowAltCircleDown, FaMapMarkerAlt } from 'react-icons/fa';

function Home() {
  const defaultRouteOptions = [{ value: "N/A", label: "Select Route" }];
  const defaultDirectionOptions = [{ value: "N/A", label: "Select Direction" }];
  const defaultStopOptions = [{ value: "N/A", label: "Select Stop" }];
  const [state, setState] = useState<AppState>({
    routeOptions: defaultRouteOptions,
    directionOptions: defaultDirectionOptions,
    stopOptions: defaultStopOptions,
    selectedRoute: null,
    selectedDirection: null,
    selectedStop: null,
    error: null,
  });


  // Handling Routing from Modal Popup to Main Page
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const parseQueryParams = (queryString) => {
    const params = new URLSearchParams(queryString);
    return {
      route: params.get('route'),
      direction: params.get('direction'),
      stop: params.get('stop'),
    };
  };

  useEffect(() => {
    const { route, direction, stop } = parseQueryParams(location.search);

    if (!location.search) {
      setState({
        routeOptions: defaultRouteOptions,
        directionOptions: defaultDirectionOptions,
        stopOptions: defaultStopOptions,
        selectedRoute: null,
        selectedDirection: null,
        selectedStop: null,
        error: null,
      });
      setShow(false);
      return;
    }

    if (route && direction && stop) {
      setState((prevState) => ({
        ...prevState,
        selectedRoute: route,
        selectedDirection: direction,
        selectedStop: stop,
      }));
      setShow(true);
    }
  }, [location.search]);

  const handleClose = () => {
    setShow(false);
    navigate(location.pathname);
  };


  // Used to fetch information and query states from the metro next API
  useEffect(() => {
    const fetchRouteOptions = async () => {
      try {
        const response = await axios.get('https://svc.metrotransit.org/nextrip/routes');
        const responseData: RouteOptions[] = [...defaultRouteOptions];
        response.data.forEach((data) => {
          responseData.push({
            label: data.route_label,
            value: data.route_id,
          });
        });
        setState((prevState) => ({ ...prevState, routeOptions: responseData }));
      } catch (error) {
        console.error('Error fetching route options:', error);
        setState((prevState) => ({ ...prevState, error: 'Failed to load route options' }));
      }
    };

    const fetchDirectionOptions = async (routeId) => {
      try {
        if (routeId !== "N/A") {
          const response = await axios.get(`https://svc.metrotransit.org/nextrip/directions/${routeId}`);
          const responseData: DirectionOptions[] = [...defaultDirectionOptions];
          response.data.forEach((data) => {
            responseData.push({
              label: data.direction_name,
              value: data.direction_id,
            });
          });
          setState((prevState) => ({
            ...prevState,
            directionOptions: responseData,
            stopOptions: defaultStopOptions,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            directionOptions: defaultDirectionOptions,
            stopOptions: defaultStopOptions,
          }));
        }
      } catch (error) {
        console.error('Error fetching direction options:', error);
        setState((prevState) => ({ ...prevState, error: 'Failed to load direction options' }));
      }
    };

    const fetchStopOptions = async (routeId, directionId) => {
      try {
        if (routeId !== "N/A" && directionId !== "N/A") {
          const response = await axios.get(`https://svc.metrotransit.org/nextrip/stops/${routeId}/${directionId}`);
          const responseData: StopOptions[] = [...defaultStopOptions];
          response.data.forEach((data) => {
            responseData.push({
              label: data.description,
              value: data.place_code,
            });
          });
          setState((prevState) => ({ ...prevState, stopOptions: responseData }));
        } else {
          setState((prevState) => ({
            ...prevState,
            stopOptions: defaultStopOptions,
          }));
        }
      } catch (error) {
        console.error('Error fetching stop options:', error);
        setState((prevState) => ({ ...prevState, error: 'Failed to load stop options' }));
      }
    };

    if (state.routeOptions.length === 1) {
      fetchRouteOptions();
    }

    if (state.selectedRoute && state.directionOptions.length === 1) {
      fetchDirectionOptions(state.selectedRoute);
    }

    if (state.selectedRoute && state.selectedDirection && state.stopOptions.length === 1) {
      fetchStopOptions(state.selectedRoute, state.selectedDirection);
    }
  }, [state.selectedRoute, state.selectedDirection, state.selectedStop]);

  const handleRouteChange = (route) => {
    setState((prevState) => ({
      ...prevState,
      selectedRoute: route,
      directionOptions: defaultDirectionOptions,
      stopOptions: defaultStopOptions,
      selectedDirection: null,
      selectedStop: null,
    }));
  };

  const handleDirectionChange = (direction) => {
    setState((prevState) => ({
      ...prevState,
      selectedDirection: direction,
      stopOptions: defaultStopOptions,
      selectedStop: null,
    }));
  };

  const handleStopChange = (stop) => {
    const { selectedRoute, selectedDirection } = state;
    setState((prevState) => ({
      ...prevState,
      selectedStop: stop,
    }));
    navigate(`?route=${selectedRoute}&direction=${selectedDirection}&stop=${stop}`); // Update URL
  };

  return (
    <div className="homediv">
      <div className="banner-holder">
        <div className="banner-overlay">
          <img className="banner-img" src="/lightrail.png" alt="Subway Banner" />
          <div className="banner-text">
            <h1>Welcome to the Transit Tracker</h1>
            <p>Navigate Your Journey with Ease: The Transit Tracker Way!</p>
          </div>
        </div>
      </div>
      <div className="RouteFinder">
        <div className="RouteFinderTitle">
          <h2>Find Your Stop Schedule</h2>
        </div>
        <div className="dropdownlist">
          <BootstrapDropdown
            options={state.routeOptions}
            onSelect={handleRouteChange}
            defaultVal = {state.routeOptions && state.selectedRoute ? state.routeOptions.find((route) => route.value === state.selectedRoute)?.label : "Select Route"}
            icon={<FaRoute />}
          />
          <BootstrapDropdown
            options={state.directionOptions}
            onSelect={handleDirectionChange}
            defaultVal={state.directionOptions && state.selectedDirection ? state.directionOptions.find((dir) => dir.value == state.selectedDirection)?.label : "Select Direction"}
            icon={<FaArrowAltCircleDown />}
          />
          <BootstrapDropdown
            options={state.stopOptions}
            onSelect={handleStopChange}
            defaultVal= {state.stopOptions && state.selectedStop ? state.stopOptions.find((stop) => stop.value === state.selectedStop)?.label : "Select Stop"}
            icon={<FaMapMarkerAlt />}
          />
        </div>
        <ScheduleModal
          show={show}
          onHide={handleClose}
          tripInfo={{
            route: state.selectedRoute,
            direction: state.selectedDirection,
            stop: state.selectedStop,
          }}
        />
      </div>
    </div>
  );
}

export default Home;