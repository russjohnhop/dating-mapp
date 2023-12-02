import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LocationForm from "./components/LocationForm";
import Suggestions from "./components/Suggestions";
import LocationMap from "./components/LocationMap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LocationForm />
      <LocationMap />
    </>
  );
}

export default App;
