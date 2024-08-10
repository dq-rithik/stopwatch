import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
    setLaps([]);
  };
  const lap = () => {
    if (isRunning) {
      setLaps([...laps, formatTime(seconds)]);
    }
  };

  return (
    <div className="container">
      <div id="display">{formatTime(seconds)}</div>
      <div className="controls">
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
        <button onClick={lap}>Lap</button>
      </div>
      <div id="laps">
        <h2>Laps</h2>
        <ul id="lapList">
          {laps.map((lap, index) => <li key={index}>{lap}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
