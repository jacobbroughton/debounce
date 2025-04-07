import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState<
    "Waiting for input" | "Typing" | "Async function running"
  >("Waiting for input");
  const [inputValue, setInputValue] = useState<string>("");
  const [isInitial, setIsInitial] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (status !== "Typing") setStatus("Typing");
    setInputValue(e.target.value);
    if (isInitial) setIsInitial(false)
  }

  function asyncFunction() {
    setStatus("Async function running");

    setTimeout(() => {
      setStatus("Waiting for input");
    }, 2000);
  }

  useEffect(() => {
    let timeout = undefined;

    if (!isInitial) timeout = setTimeout(asyncFunction, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue, isInitial]);

  return (
    <>
      <input onChange={handleChange} />
      <p>{status}</p>
    </>
  );
}

export default App;
