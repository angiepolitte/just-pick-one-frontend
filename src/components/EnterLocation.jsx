import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/styles.css";

function EnterLocation() {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmedZip = zipCode.trim(); // <-- corrected here

    if (/^\d{5}$/.test(trimmedZip)) {
      setLoading(true);
      setError(null);

      try {
        const url = `https://web-production-70c9.up.railway.app/api/restaurants?query=${encodeURIComponent(
          trimmedZip
        )}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
          navigate("/results", {
            state: { restaurants: data.results },
          });
        } else {
          setError(data.status);
        }
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Invalid ZIP code format. Please enter exactly 5 digits.");
    }
  };
  //searching by location services-no zip code
  const handleUseMyLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const url = `https://web-production-70c9.up.railway.app/api/restaurants/location?lat=${latitude}&lng=${longitude}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data.status === "OK") {
            navigate("/results", {
              state: { restaurants: data.results },
            });
          } else {
            setError(data.status);
          }
        } catch (err) {
          setError(err.message || "An Error Occurred.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError(
          "Unable to retrieve your location.  Please update your location services in Settings."
        );
        setLoading(false);
      }
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <main className="container" role="main">
      <h1 className="heading">Fork and Fate</h1>

      <h2 className="subheading">
        Can’t decide where to eat?
        <br />
        Let fate choose for you!
        <br />
        Enter your location and we’ll randomly pick a restaurant nearby.
      </h2>

      {/* Main Search Box */}
      <div className="box">
        <h2 style={{ color: "#e9ebf8", fontSize: "2rem" }}>
          Choosing is hard
          <br />
          ~
          <br />
          Eating is easy
        </h2>
        <div className="form-group">
          <input
            type="text"
            className="input"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Enter your 5-digit ZIP Code"
            pattern="[0-9]{5}"
            inputMode="numeric"
          />
        </div>
        <div className="buttons">
          <button
            className="shared-button"
            onClick={handleSearch}
            aria-disabled={loading}
            aria-label="Search restaurants by ZIP code"
          >
            {loading ? <span className="pulse-ring" /> : "Search Restaurants"}
          </button>
          <button
            className="shared-button"
            onClick={handleUseMyLocation}
            aria-disabled={loading}
            aria-label="Search restaurants by current location"
          >
            {loading ? <span className="pulse-ring" /> : "Use Current Location"}
          </button>
        </div>
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            style={{ marginTop: "1rem", color: "red" }}
          >
            Error: {error}
          </div>
        )}
      </div>
    </main>
  );
}

export default EnterLocation;
