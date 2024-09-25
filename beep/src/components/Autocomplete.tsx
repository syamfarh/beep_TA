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

    return (
        <div className="w-full">
          {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
          <div className={`relative ${disabled ? 'opacity-50' : ''}`}>
            <input
              //ref={inputRef}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={placeholder}
              value={inputValue}
              //onChange={handleInputChange}
              //onKeyDown={handleKeyDown}
              disabled={disabled}
              onClick={() => setIsOpen(!isOpen)}
            />
            {loading && (
              <div className="absolute top-0 right-0 mr-4 mt-3">
                <div className="loader"></div>
              </div>
            )}
            {isOpen && filteredOptions.length > 0 && (
              <div
                //ref={dropdownRef}
                className="absolute w-full bg-white border border-gray-200 rounded mt-1 shadow-lg z-10"
              >
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer ${
                      index === focusedIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                    //onMouseDown={() => handleOptionClick(option)}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    {renderOption
                      ? renderOption(option, index === focusedIndex)
                      : String(option)}
                  </div>
                ))}
              </div>
            )}
          </div>
          {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
        </div>
      );



  }

export default AutoComplete;