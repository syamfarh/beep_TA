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
  }: AutocompleteProps<T>) => {}

export default AutoComplete;