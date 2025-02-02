import Main from "./components/Main";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;

      // ✅ Fix: Check if data exists before parsing
      const cachedData = localStorage.getItem(localKey);
      if (cachedData) {
        try {
          setData(JSON.parse(cachedData)); // ✅ Safe parsing
          console.log("Fetched from cache today");
          return;
        } catch (err) {
          console.error("Error parsing cached data:", err.message);
        }
      }

      localStorage.clear(); // Clear old data

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData)); // ✅ Save as JSON string
        setData(apiData);
        console.log("Fetched from API today");
      } catch (err) {
        console.log("Error fetching NASA data:", err.message);
      }
    }

    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;

