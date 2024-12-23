import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDown from './DropDown';
import '@testing-library/jest-dom';

const mockOnSelect = jest.fn();

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('DropDown Component', () => {
  it('renders dropdown with options', () => {
    render(<DropDown options={options} onSelect={mockOnSelect} defaultVal="Select Option" icon={null} />);
    
    const dropdownTitle = screen.getByText(/Select Option/i);
    expect(dropdownTitle).toBeInTheDocument();
    
    const dropdownButton = screen.getByRole('button');
    expect(dropdownButton).toBeInTheDocument();
  });

  it('calls onSelect with the correct value when an option is selected', () => {
    render(<DropDown options={options} onSelect={mockOnSelect} defaultVal="Select Option" icon={null} />);
    
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Option 2'));

    expect(mockOnSelect).toHaveBeenCalledWith('2');
  });

  it('filters options based on search query', () => {
    render(<DropDown options={options} onSelect={mockOnSelect} defaultVal="Select Option" icon={null} />);
    
    fireEvent.click(screen.getByRole('button'));

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Option 2' } });

    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).toBeNull();
    expect(screen.queryByText('Option 3')).toBeNull();
  });

  it('displays "No results found" if no options match the search query', () => {
    render(<DropDown options={options} onSelect={mockOnSelect} defaultVal="Select Option" icon={null} />);
    
    fireEvent.click(screen.getByRole('button'));

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
