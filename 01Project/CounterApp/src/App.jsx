import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 select-none'>
      {/* Title */}
      <h1 className='text-4xl text-white font-extrabold mb-12'>Counter App</h1>
      {/* Counter value */}
      <div className='text-2xl text-white font-bold mb-12'>{counter}</div>
      {/* Children Container */}
      <div className='flex gap-6'>
        <div className='p-6 bg-blue-500 shadow-lg rounded-2xl w-60 text-center hover:scale-105 transition-transform'>
          <p
            className='text-white font-semibold cursor-pointer'
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            Increment
          </p>
        </div>
        <div className='p-6 bg-green-500 shadow-lg rounded-2xl w-60 text-center hover:scale-105 transition-transform'>
          <p
            className='text-white font-semibold cursor-pointer'
            onClick={() => {
              setCounter(counter - 1);
            }}
          >
            Decrement
          </p>
        </div>
        <div className='p-6 bg-red-500 shadow-lg rounded-2xl w-60 text-center hover:scale-105 transition-transform'>
          <p
            className='text-white font-semibold cursor-pointer'
            onClick={() => {
              setCounter(0);
            }}
          >
            Reset
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
