import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRandomColor } from "./Colors";
import "@fontsource/fredoka";
import "/src/css/styles.css";

function Results() {
  const location = useLocation();
  const restaurants = location.state?.restaurants || [];
  const navigate = useNavigate();
  const { backgroundColor, textColor } = getRandomColor();

  const handleRandomRestaurant = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      const randomRestaurant = restaurants[randomIndex];
      navigate("/random-result", {
        state: { restaurant: randomRestaurant, restaurants: restaurants },
      });
    }
  };

  if (restaurants.length === 0) {
    return (
      <div className="container no-results">
        <p>No restaurant results found.</p>
      </div>
    );
  }

  return (
    <main className="results-container" role="main">
      <h1 className="results-title">Restaurants in the Area</h1>
      <button
        className="random-button"
        style={{ backgroundColor, color: textColor }}
        onClick={handleRandomRestaurant}
        aria-label="Randomly choose a restaurant from the list"
      >
        Let Fate Decide!
      </button>
      <div className="grid">
        {restaurants.map((restaurant) => (
          <div
            className="grid-item"
            key={restaurant.place_id}
            style={{ backgroundColor: getRandomColor().backgroundColor }}
          >
            <div className="card-content">
              <h2>{restaurant.name}</h2>
              <p>{restaurant.formatted_address}</p>
              {restaurant.rating && <p>Rating: {restaurant.rating}</p>}
              {restaurant.place_id && (
                <p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${restaurant.name} ${restaurant.formatted_address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* <a
                      href={`https://www.google.com/maps/place/?q=place_id:${restaurant.place_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    > */}
                    View on Google Maps
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Results;
