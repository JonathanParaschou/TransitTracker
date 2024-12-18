import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap';
import { DropState } from '../Interfaces/Interfaces';

const BootstrapDropdown = ({ options, onSelect, defaultVal }) => {
  const [selectedOption, setSelectedOption] = useState<DropState>({
    label: defaultVal,
  });

  const handleSelect = (eventKey) => {
    const selectedItem = options.find((option) => option.value == eventKey);
    setSelectedOption({ label: selectedItem?.label });
    onSelect(eventKey);
  };

  useEffect(() => {
    setSelectedOption((prevState) => ({ ...prevState, label: defaultVal }));
  }, [options]);

  return (
    <div className="dropdowndiv">
      {options.length > 1 ? (
          <DropdownButton className='dropdownbutton' variant="light" size="lg" title={selectedOption.label} onSelect={handleSelect}>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {options.map((option) => (
                <DropdownItem key={option.label} eventKey={option.value}>
                  {option.label}
                </DropdownItem>
              ))}
            </div>
          </DropdownButton>
      ) : null}
    </div>
  );
};

export default BootstrapDropdown;