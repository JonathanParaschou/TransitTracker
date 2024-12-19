import React, { useEffect, useState } from 'react';
import { DropdownButton, DropdownItem } from 'react-bootstrap';
import { DropState } from '../Interfaces/Interfaces';

const BootstrapDropdown = ({ options, onSelect, defaultVal, icon }) => {
  const [selectedOption, setSelectedOption] = useState<DropState>({
    label: defaultVal,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleSelect = (eventKey) => {
    const selectedItem = options.find((option) => option.value == eventKey);
    setSelectedOption({ label: selectedItem?.label });
    onSelect(eventKey);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(query)
      )
    );
  };

  useEffect(() => {
    setSelectedOption((prevState) => ({ ...prevState, label: defaultVal }));
    setFilteredOptions(options);
  }, [options]);

  return (
    <div className="dropdowndiv">
      {options.length > 1 ? (
        <DropdownButton
          className="dropdownbutton custom-dropdown-button"
          variant="light"
          size="lg"
          title={
            <div className="dropdown-title-content">
              {icon && <span className="dropdown-icon" style={{ marginRight: '8px' }}>{icon}</span>}
              {selectedOption.label}
            </div>
          }
          onSelect={handleSelect}
        >
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <div className="dropdown-search" style={{ padding: '8px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {filteredOptions.map((option) => (
              <DropdownItem key={option.label} eventKey={option.value}>
                {option.label}
              </DropdownItem>
            ))}

            {filteredOptions.length === 0 && (
              <div className="dropdown-no-results" style={{ padding: '8px', textAlign: 'center' }}>
                No results found
              </div>
            )}
          </div>
        </DropdownButton>
      ) : null}
    </div>
  );
};

export default BootstrapDropdown;
