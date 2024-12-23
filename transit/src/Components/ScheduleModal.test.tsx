import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScheduleModal from './ScheduleModal';
import axios from 'axios';

jest.mock('axios');

describe('ScheduleModal Component', () => {
  const mockOnHide = jest.fn();
  const mockResponse = {
    data: {
      stops: [{ stop_id: '123', description: 'Main Street' }],
      departures: [
        {
          route_short_name: 'Route 1',
          description: 'Downtown',
          departure_text: '10:00 AM'
        }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when shown and data is fetched', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const tripInfo = {
      route: 'Route 1',
      direction: 'North',
      stop: 'Main Street'
    };

    render(<ScheduleModal show={true} onHide={mockOnHide} tripInfo={tripInfo} />);

    // Wait for the modal to show and verify the fetched data
    await waitFor(() => expect(screen.getByText('Route 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Main Street')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('10:00 AM')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Downtown')).toBeInTheDocument());
  });

  it('shows "No Departures Scheduled" when no departure data is available', async () => {
    const mockEmptyResponse = {
      data: {
        stops: [{ stop_id: '123', description: 'Main Street' }],
        departures: []
      }
    };
    (axios.get as jest.Mock).mockResolvedValue(mockEmptyResponse);

    const tripInfo = {
      route: 'Route 1',
      direction: 'North',
      stop: 'Main Street'
    };

    render(<ScheduleModal show={true} onHide={mockOnHide} tripInfo={tripInfo} />);

    await waitFor(() => expect(screen.getByText('No Departures Scheduled')).toBeInTheDocument());
  });

  it('displays the departure data when fetched successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const tripInfo = {
      route: 'Route 1',
      direction: 'North',
      stop: 'Main Street'
    };

    render(<ScheduleModal show={true} onHide={mockOnHide} tripInfo={tripInfo} />);

    await waitFor(() => expect(screen.getByText('Route 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('10:00 AM')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Downtown')).toBeInTheDocument());
  });
});
