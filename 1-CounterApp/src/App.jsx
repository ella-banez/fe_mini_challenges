import { useState } from 'react'
import './App.css'

const selectorValues = Array.from({ length: 10 }, (_, i) => (i + 1));

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  //Handlers

  function handleStepChange(e) {
    setStep(Number(e.target.value));
  }

  function handleIncrement() {
    setCount((count) => count + step);
  }

  function handleDecrement() {
    setCount((count) => count - step);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <>
      <h1>Simple Counter</h1>
      <p>Track a value — use + to increase, − to decrease, or Reset to return to zero.</p>
      <h2 aria-live='polite'>Count is <b>{count}</b></h2>
      <fieldset>
        <label htmlFor='step-select'>Step Value:
          <select id='step-select' value={step} onChange={handleStepChange}>
            {selectorValues.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
        <div className='button-group'>
          <button type='button' className="btn-primary" onClick={handleIncrement}>+ Increment</button>
          <button type='button' className='btn-danger' onClick={handleDecrement} disabled={count === 0}>− Decrement</button>
          <button type='button' className='btn-tertiary' onClick={handleReset} disabled={count === 0} aria-disabled={count === 0 }>Reset</button>
        </div>
      </fieldset>
    </>
  )
}

export default App
