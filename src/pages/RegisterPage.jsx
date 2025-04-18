import {
  Box,
} from "@mui/material";
import RegistForm from "../components/RegistForm";

const RegistPage = () => {

  return (

    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/bg-login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay untuk efek gelap */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Card Login */}
      <Box sx={{ zIndex: 2 }}>
        <RegistForm />
      </Box>
    </Box>

  );
};

export default RegistPage;
