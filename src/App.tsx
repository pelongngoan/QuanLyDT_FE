import { useEffect } from "react";
import "./App.css";
import UserLayout from "./layouts/UserLayout";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response; // Call json() as a function
      })
      .then((data) => console.log(data)) // Use the data here
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <>
      <UserLayout />
    </>
  );
}

export default App;
