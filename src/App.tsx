import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState<
    "Waiting for input" | "Typing" | "Async function running"
  >("Waiting for input");
  const [inputValue, setInputValue] = useState<string>("");


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (status !== "Typing") setStatus("Typing");
    setInputValue(e.target.value);
  }

  function asyncFunction() {
    setStatus("Async function running");

    setTimeout(() => {
      setStatus("Waiting for input");
    }, 1000);
  }

  useEffect(() => {
    const interval = setTimeout(asyncFunction, 3000);

    return () => {
      clearTimeout(interval);
    };
  }, [inputValue]);

  return (
    <>
      <input onChange={handleChange} />
      <p>{status}</p>
    </>
  );
}

export default App;
