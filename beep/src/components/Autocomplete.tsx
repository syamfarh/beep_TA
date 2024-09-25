import React, { useState, useEffect, useRef } from 'react';

interface AutocompleteProps<T> {
    description?: string;
    disabled?: boolean;
    filterOptions?: (inputValue: string, options: T[]) => T[];
    label?: string;
    loading?: boolean;
    multiple?: boolean;
    onChange: (value: T | T[]) => void;
    onInputChange?: (inputValue: string) => void;
    options: T[];
    placeholder?: string;
    renderOption?: (option: T, isSelected: boolean) => JSX.Element;
    value: T | T[];
    debounceTime?: number; // To support debounced search.
  }

const AutoComplete = <T,>({
    description = '',
    disabled = false,
    filterOptions,
    label = '',
    loading = false,
    multiple = false,
    onChange,
    onInputChange,
    options,
    placeholder = '',
    renderOption,
    value,
    debounceTime = 300, // Default debounce of 300ms.
  }: AutocompleteProps<T>) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
          if (filterOptions) {
            // Use custom filtering logic if provided
            setFilteredOptions(filterOptions(inputValue, options));
          } else {
            // Default filtering logic: case-insensitive match
            setFilteredOptions(
              options.filter((option) =>
                String(option).toLowerCase().startsWith(inputValue.toLowerCase())
              )
            );
          }
        }, debounceTime);
    
        return () => clearTimeout(timer);
      }, [inputValue, options, filterOptions, debounceTime]);

  // Handle clicking outside the component to close the dropdown.
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  const handleOptionClick = (option: T) => {
    if (multiple) {
      // Treat value as an array
      const currentValue = Array.isArray(value) ? value : [];
  
      if (currentValue.includes(option)) {
        // Unselect the option (remove it from the value array)
        onChange(currentValue.filter((v) => v !== option));
      } else {
        // Select the option (add it to the value array)
        onChange([...currentValue, option]);
      }
    } else {
      // For single selection
      onChange(option);
      //setInputValue(String(option));
      //setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex((prev) => (prev + 1) % filteredOptions.length);
        setIsOpen(true);
        break;
      case 'ArrowUp':
        setFocusedIndex((prev) =>
          prev === 0 || prev === -1 ? filteredOptions.length - 1 : prev - 1
        );
        setIsOpen(true);
        break;
      case 'Enter':
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const isSelected = (option: T) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(option);
    }
    return value === option;
  };

    return (
        <div className="w-full">
          {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
          <div className={`relative ${disabled ? 'opacity-50' : ''}`}>
            <input
              ref={inputRef}
              type="text"
              className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              onClick={() => setIsOpen(!isOpen)}
            />
            {loading && (
              <div className="absolute top-0 right-0 mr-4 mt-3">
                <div className="loader"></div>
              </div>
            )}
            {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute w-full bg-white border border-gray-200 rounded mt-1 shadow-lg z-10 max-h-48 overflow-y-auto"
          >
            {filteredOptions.length > 0 ? ( // Check if options are available
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer ${
                    index === focusedIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                  onMouseDown={() => handleOptionClick(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected(option)}
                    onChange={() => handleOptionClick(option)}
                    className="mr-2"
                  />
                  {renderOption ? renderOption(option, isSelected(option)) : String(option)}
                </div>
              ))
            ) : (
              // Display "No results found" when no options are available
              <div className="px-4 py-2 text-gray-500 text-center">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
          {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
        </div>
      );

  }

export default AutoComplete;