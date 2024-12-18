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
    <div>
      {options.length > 1 ? (
        <Dropdown onSelect={handleSelect}>
          <DropdownButton variant="light" size="lg" title={selectedOption.label}>
            {options.map((option) => (
              <DropdownItem key={option.label} eventKey={option.value}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownButton>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default BootstrapDropdown;