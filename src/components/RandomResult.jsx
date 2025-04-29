import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100%", // Full width
      }}
    >
      <Card sx={{ backgroundColor: getRandomColor(), mb: 2, width: "100%" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {randomRestaurant.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {randomRestaurant.formatted_address}
          </Typography>
          {randomRestaurant.rating && (
            <Typography variant="body1">
              Rating: {randomRestaurant.rating}
            </Typography>
          )}
        </CardContent>
      </Card>
      <Button
        variant="contained"
        onClick={selectRandom}
        sx={{
          backgroundColor,
          color: textColor,
          transition: "0.2s",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        Choose Again
      </Button>
    </Container>
  );
}

export default RandomResult;
