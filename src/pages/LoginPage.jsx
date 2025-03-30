import {
  Box,
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";

const LoginPage = () => {
  const dispatch = useDispatch()

  const onLogin = ({ password, username }) => {
    dispatch(asyncSetAuthUser({ password, username }));
  };

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
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      <Box sx={{ zIndex: 2 }}>
        <LoginForm login={onLogin} />
      </Box>
    </Box>

  );
};

export default LoginPage;
