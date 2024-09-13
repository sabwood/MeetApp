import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (e) => {
    let value = e.target.value;
    setNumber(value);

    let errorText;

    if (isNaN(value) || value <= 0) {
      errorText = 'Please enter a valid number'
    } else {
      errorText = ''
    }
    setCurrentNOE(value)
    setErrorAlert(errorText)
  };

  return (
    <div id="numberOfEvents">
      <label>Number of Events:</label>
      <input
        type="text"
        className="number"
        value={number}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default NumberOfEvents;