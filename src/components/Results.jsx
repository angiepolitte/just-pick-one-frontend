import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { getRandomColor } from "./Colors";

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
      <Container>
        <Typography variant="body1">No restaurant results found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Restaurant Results:
      </Typography>
      <Button
        variant="contained"
        onClick={handleRandomRestaurant}
        sx={{
          backgroundColor,
          color: textColor,
          transition: "0.2s",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        Just Pick One!
      </Button>
      <Grid container spacing={2} justifyContent="center">
        {restaurants.map((restaurant) => (
          <Grid
            key={restaurant.place_id}
            sx={{
              flexBasis: { xs: "100%", sm: "50%", md: "33.33%", lg: "25%" },
            }}
          >
            <Card
              sx={{
                backgroundColor: getRandomColor(),
                height: "100%",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2">
                  {restaurant.formatted_address}
                </Typography>
                {restaurant.rating && (
                  <Typography variant="body2">
                    Rating: {restaurant.rating}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Results;
