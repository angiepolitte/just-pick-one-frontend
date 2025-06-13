import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { getRandomColor } from "./Colors";

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
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          width: "100%", // Full width
        }}
      >
        <Typography variant="body1">No restaurant selected.</Typography>
      </Container>
    );
  }
  const handleNewLocation = () => {
    navigate("/"); // Navigates back to the EnterLocation page
  };

  return (
    <Container
      role="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Card sx={{ backgroundColor, color: textColor, mb: 2, width: "100%" }}>
        <CardContent aria-live="polite">
          <Typography variant="h4" gutterBottom>
            {randomRestaurant.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {randomRestaurant.formatted_address}
          </Typography>
          {randomRestaurant.rating && (
            <>
              <Typography variant="body1">
                Rating: {randomRestaurant.rating}
              </Typography>
              {randomRestaurant.place_id && (
                <Typography variant="body1" gutterBottom>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${randomRestaurant.name} ${randomRestaurant.formatted_address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${randomRestaurant.name} on Google Maps`}
                  >
                    {/* <a
                    href={`https://www.google.com/maps/place/?q=place_id:${randomRestaurant.place_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  > */}
                    View on Google Maps
                  </a>
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <Button
        variant="text"
        onClick={selectRandom}
        aria-label="Pick another random restaurant"
        className="shared-button"
        disableElevation
        disableRipple
      >
        Not feelin' it? Pick another!
      </Button>
      <Button
        variant="text"
        onClick={handleNewLocation}
        aria-label="Start your search over"
        className="shared-button"
        disableElevation
        disableRipple
      >
        Start your search over
      </Button>
    </Container>
  );
}

export default RandomResult;
