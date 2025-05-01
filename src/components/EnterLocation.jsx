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
import "@fontsource/fredoka"; // Fun Google Font

function EnterLocation() {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://web-production-70c9.up.railway.app/api/restaurants?query=${encodeURIComponent(
        zipCode
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
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleSearch();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center", // Horizontally centers the content
        alignItems: "flex-start", // Vertically align content at the top
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height with flexbox layout
        paddingTop: "20px", // Add some space from the top
      }}
    >
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontFamily: "Fredoka",
          color: "#413C58",
          mb: 2,
          fontSize: { xs: "2.5rem", sm: "3rem" }, // Adjust font size for smaller screens
        }}
      >
        Just Pick One, Already!
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: "Fredoka",
          color: "#6D597A",
          mb: 4,
          fontSize: { xs: "1rem", sm: "1.2rem" }, // Adjust font size for smaller screens
        }}
      >
        Can’t decide where to eat? Let fate choose for you! Enter your location
        and we’ll randomly pick a restaurant nearby.
      </Typography>

      {/* Main Search Box */}
      <Box
        sx={{
          p: 4,
          bgcolor: "#8d818c",
          borderRadius: 2,
          textAlign: "center",
          boxShadow: 3,
          width: "100%", // Ensure it takes full width on mobile
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          color="#e9ebf8"
          sx={{
            fontFamily: "Fredoka",
            fontSize: { xs: "1.5rem", sm: "1.75rem" }, // Adjust for smaller screens
          }}
        >
          Because choosing is hard, but eating is easy
        </Typography>
        <TextField
          fullWidth
          label="Enter Zip Code"
          variant="outlined"
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
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{ mt: 3, bgcolor: "#e9ebf8", color: "#000" }}
        >
          {loading ? <CircularProgress size={24} /> : "Search Restaurants"}
        </Button>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default EnterLocation;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Typography,
//   Container,
//   Box,
//   TextField,
//   CircularProgress,
// } from "@mui/material";
// import "@fontsource/fredoka"; // Fun Google Font

// function EnterLocation() {
//   const [zipCode, setZipCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSearch = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const url = `https://web-production-70c9.up.railway.app/api/restaurants?query=${encodeURIComponent(
//         // const url = `http://localhost:8080/api/restaurants?query=${encodeURIComponent(
//         zipCode
//       )}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.status === "OK") {
//         navigate("/results", {
//           state: { restaurants: data.results },
//         });
//       } else {
//         setError(data.status);
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") handleSearch();
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: "flex",
//         justifyContent: "center", // Horizontally centers the content
//         alignItems: "center", // Vertically centers the content
//         flexDirection: "column",
//         height: "100vh", // Full viewport height
//         margin: "auto", // Center content horizontally
//       }}
//     >
//       <Typography
//         variant="h3"
//         align="center"
//         sx={{ fontFamily: "Fredoka", color: "#413C58", mb: 2 }}
//       >
//         Just Pick One, Already!
//       </Typography>

//       <Typography
//         variant="h6"
//         align="center"
//         sx={{ fontFamily: "Fredoka", color: "#6D597A", mb: 4 }}
//       >
//         Can’t decide where to eat? Let fate choose for you! Enter your location
//         and we’ll randomly pick a restaurant nearby.
//       </Typography>

//       {/* Main Search Box */}
//       <Box
//         sx={{
//           p: 4,
//           bgcolor: "#8d818c",
//           borderRadius: 2,
//           textAlign: "center",
//           boxShadow: 3,
//         }}
//       >
//         <Typography
//           variant="h4"
//           gutterBottom
//           color="#e9ebf8"
//           sx={{ fontFamily: "Fredoka" }}
//         >
//           Because choosing is hard, but eating is easy
//         </Typography>
//         <TextField
//           fullWidth
//           label="Enter Zip Code"
//           variant="outlined"
//           value={zipCode}
//           onChange={(e) => setZipCode(e.target.value)}
//           onKeyDown={handleKeyDown}
//           sx={{
//             mt: 2,
//             backgroundColor: "#fff",
//             borderRadius: 1,
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "#ccc", // Border color when focused
//               },
//               "&:hover fieldset": {
//                 borderColor: "#ccc", // Border color on hover
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "#ccc", // Prevent blue outline on focus
//               },
//               "& .MuiInputBase-input": {
//                 color: "#000", // Text color (normal and focused state)
//               },
//             },
//             "& .MuiInputLabel-root": {
//               color: "#000", // Label color (normal state)
//             },
//             "& .Mui-focused .MuiInputLabel-root": {
//               color: "#000", // Keep label color black when focused
//             },
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           disabled={loading}
//           sx={{ mt: 3, bgcolor: "#e9ebf8", color: "#000" }}
//         >
//           {loading ? <CircularProgress size={24} /> : "Search Restaurants"}
//         </Button>
//         {error && (
//           <Typography variant="body2" color="error" sx={{ mt: 2 }}>
//             Error: {error}
//           </Typography>
//         )}
//       </Box>
//     </Container>
//   );
// }

// export default EnterLocation;
