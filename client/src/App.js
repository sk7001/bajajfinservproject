import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('http://localhost:2000/bfhl', {
        data: parsedData.data,
        file_b64: parsedData.file_b64 || null,
      });
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or request failed!');
      console.error(error);
    }
  };

  const handleFilterChange = selectedOptions => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = selectedOptions.map(option => {
      if (response[option.value]) {
        return <p key={option.value}><strong>{option.label}:</strong> {JSON.stringify(response[option.value])}</p>;
      }
      return null;
    });

    return (
      <div style={{ marginTop: '20px' }}>
        {filteredResponse}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#007bff', marginBottom: '20px' }}>
        {response ? response.roll_number : 'Bajaj Finserv Health Dev Challenge'}
      </h1>

      <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>API Input:</label>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder='Enter JSON data'
        rows='5'
        cols='50'
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#007bff',
          width:'100%',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '4px',
          fontSize: '16px',
          marginBottom: '20px',
        }}
      >
        Submit
      </button>
      <br />

      <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Filter Response:</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleFilterChange}
        classNamePrefix="select"
      />

      {renderResponse()}
    </div>
  );
};

export default App;
