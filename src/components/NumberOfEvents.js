import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);
  const [newValue, setNewValue] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const handleInputChange = (e) => {
    setNewValue(e.target.value);
    setIsChanged(true);

    if (e.target.value === '') {
      setNumber(0)
    } else {
      setNumber(e.target.value)
      setCurrentNOE(e.target.value)
    }
  };

  return (
    <div id="numberOfEvents">
      <label>Number of Events:</label>
      <input
        type="text"
        className="number"
        value={isChanged ? newValue : number}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default NumberOfEvents;