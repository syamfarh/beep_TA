import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from './components/Autocomplete';

const options = [
  'Apple',
  'Apricot',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Cantaloupe',
  'Date',
  'Dragonfruit',
  'Durian',
  'Elderberry',
  'Grape',
  'Grapefruit',
  'Green Apple',
  'Honeydew',
  'Jackfruit',
  'Kiwi',
  'Lemon',
  'Lime',
  'Mango',
  'Mangosteen',
  'Nectarine',
  'Orange',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Pomegranate',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Tomato',
  'Watermelon'
];

function App() {
  const [selectedValue, setSelectedValue] = useState<string | string[]>('');

  const handleOnChange = (value: string | string[]) => {
    setSelectedValue(value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* The larger container centered on the screen */}
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Select a Fruit</h1>
        <Autocomplete
          label="Fruit"
          description="Pick a fruit from the list."
          options={options}
          onChange={handleOnChange}
          placeholder="Start typing..."
          value={selectedValue}
          //multiple ={true}
          debounceTime={200}  // Default debounce of 300ms.
        />
      </div>
    </div>
  );
};

export default App;
