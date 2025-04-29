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
        <CardContent>
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
                    href={`https://www.google.com/maps/place/?q=place_id:${randomRestaurant.place_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <Button
        variant="contained"
        onClick={selectRandom}
        sx={{
          backgroundColor: "#8d818c", // Or your desired color
          color: "#fff", // Text color
          mb: 2,
          transition: "0.2s",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        Not feelin' it? Pick another!
      </Button>
      <Button
        variant="contained"
        onClick={handleNewLocation}
        sx={{
          backgroundColor: "#8d818c", // Or your desired color
          color: "#fff", // Text color
          transition: "0.2s",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        Enter a new Location
      </Button>
    </Container>
  );
}

export default RandomResult;
