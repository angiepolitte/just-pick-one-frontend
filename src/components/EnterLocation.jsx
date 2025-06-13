import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import "@fontsource/fredoka";
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
    <Container
      role="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        py: 4,
        px: 2,
        pb: 8,
        overflowY: "auto",
      }}
    >
      <Typography variant="h2" align="center" className="heading">
        Fork and Fate
      </Typography>

      <Typography variant="h4" align="center" className="subheading">
        Can’t decide where to eat?
        <br />
        Let fate choose for you!
        <br />
        Enter your location and we’ll randomly pick a restaurant nearby.
      </Typography>

      {/* Main Search Box */}
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: "#8d818c",
          borderRadius: 2,
          textAlign: "center",
          boxShadow: 3,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          color="#e9ebf8"
          sx={{ fontFamily: "Fredoka" }}
        >
          Choosing is hard
          <br />
          ~
          <br />
          Eating is easy
        </Typography>
        <TextField
          fullWidth
          label="Zip Code"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]{5}",
            "aria-label": "Enter your 5-digit ZIP Code",
          }}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            mt: 2,
            backgroundColor: "#fff",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc", // Border color when focused
              },
              "&:hover fieldset": {
                borderColor: "#ccc", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ccc", // Prevent blue outline on focus
              },
              "& .MuiInputBase-input": {
                color: "#000", // Text color (normal and focused state)
              },
            },
            "& .MuiInputLabel-root": {
              color: "#000", // Label color (normal state)
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: "#000", // Keep label color black when focused
            },
          }}
        />
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          mt={3}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="text"
            onClick={handleSearch}
            aria-disabled={loading}
            aria-label="Search restaurants by ZIP code"
            fullWidth={true}
            className="shared-button"
            disableElevation
            disableRipple
          >
            {loading ? (
              <CircularProgress size={24} color="#E8EAF6" />
            ) : (
              "Search Restaurants"
            )}
          </Button>
          <Button
            variant="text"
            onClick={handleUseMyLocation}
            aria-disabled={loading}
            aria-label="Search restaurants by current location"
            fullWidth={true}
            className="shared-button"
            disableElevation
            disableRipple
          >
            {loading ? (
              <CircularProgress size={24} color="#E8EAF6" />
            ) : (
              "Use Current Location"
            )}
          </Button>
        </Box>
        <Box role="alert" aria-live="assertive">
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              Error: {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default EnterLocation;
