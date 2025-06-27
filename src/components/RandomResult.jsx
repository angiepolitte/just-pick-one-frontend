import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRandomColor } from "./Colors";
import "/src/css/styles.css";

function RandomResult() {
  const location = useLocation();
  const restaurants = location.state?.restaurants || [];
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const { backgroundColor, textColor } = getRandomColor();
  const navigate = useNavigate();

  useEffect(() => {
    selectRandom();
  }, [restaurants]);

  const selectRandom = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setRandomRestaurant(restaurants[randomIndex]);
    }
  };

  if (!randomRestaurant) {
    return (
      <div className="container no-results">
        <p>No restaurant results found.</p>
      </div>
    );
  }
  const handleNewLocation = () => {
    navigate("/"); // Navigates back to the EnterLocation page
  };

  return (
    <main className="container results-container" role="main">
      <div
        className="surprise-card-container"
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
        <div className="card-content fade-in" aria-live="polite">
          <h1 className="results-title" role="heading" aria-level="1">
            {randomRestaurant.name}
          </h1>
          <p>{randomRestaurant.formatted_address}</p>
          {randomRestaurant.rating && (
            <>
              <p>Rating: {randomRestaurant.rating}</p>
              {randomRestaurant.place_id && (
                <p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${randomRestaurant.name} ${randomRestaurant.formatted_address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${randomRestaurant.name} on Google Maps`}
                  >
                    View on Google Maps
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="buttons">
        <button
          className="shared-button"
          aria-label="Pick another random restaurant"
          onClick={selectRandom}
        >
          Not really feelin' it? Pick another!
        </button>
        <button
          className="shared-button"
          aria-label="Start your search over"
          onClick={handleNewLocation}
        >
          Start your search over
        </button>
      </div>
    </main>
  );
}

export default RandomResult;
