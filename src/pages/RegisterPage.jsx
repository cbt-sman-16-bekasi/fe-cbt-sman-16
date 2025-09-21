import {
  Box,
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import { useLoading } from "../components/common/LoadingProvider";
import RegisterForm from "../components/page/auth/RegisterForm.jsx";

const RegisterPage = () => {
  const dispatch = useDispatch()
  const { showLoading, hideLoading } = useLoading();

  const onLogin = ({ password, username }) => {
    showLoading();
    dispatch(asyncSetAuthUser({ password, username }))
      .finally(() => hideLoading());
  };

  return (

    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        <RegisterForm login={onLogin} />
      </Box>
    </Box>

  );
};

export default RegisterPage;
