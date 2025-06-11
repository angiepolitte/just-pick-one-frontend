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
    <Container
      role="main"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        role="heading"
        aria-level="1"
        sx={{ fontFamily: "Fredoka", color: "#413C58", mb: 2 }}
      >
        Restaurants in the Area:
      </Typography>
      <Button
        variant="contained"
        onClick={handleRandomRestaurant}
        aria-label="Randomly choose a restaurant from the list"
        sx={{
          backgroundColor: backgroundColor,
          color: textColor,
          fontWeight: "bold",
          fontSize: "1.2rem",
          px: 4,
          py: 2,
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 6px 14px rgba(0,0,0,0.3)",
            opacity: 0.95,
          },
          fontFamily: "Fredoka",
          mt: 2,
          mb: 3,
        }}
      >
        Let Fate Decide!
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
                {restaurant.place_id && (
                  <Typography variant="body1" gutterBottom>
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
