import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from './components/Autocomplete';

const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']; //dummy options

function App() {
  const [selectedValue, setSelectedValue] = useState<string | string[]>('');

  const handleOnChange = (value: string | string[]) => {
    setSelectedValue(value);
  };

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">Enhanced Autocomplete</h1>
      <Autocomplete
        label="Fruit"
        description="Pick a fruit from the list."
        options={options}
        onChange={handleOnChange}
        placeholder="Start typing..."
        value={selectedValue}
        debounceTime={500} //Optional debounce
      />
    </div>
  );
}

export default App;
