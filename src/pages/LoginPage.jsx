import {
  Box,
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import { useEffect } from "react";
import { asyncGetSchoolInfo } from '../states/school/action'
import Loading from "../components/Loading";
import { useLoading } from "../components/common/LoadingProvider";

const LoginPage = () => {
  const dispatch = useDispatch()
  const schoolData = useSelector((state) => state.school.schoolInfo);
  const LICENSE_KEY = import.meta.env.VITE_SCHOOL_ID;
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      if (LICENSE_KEY) {
        showLoading();
        try {
          await dispatch(asyncGetSchoolInfo(LICENSE_KEY));
        } finally {
          hideLoading();
        }
      }
    };

    fetchData();
  }, [LICENSE_KEY, dispatch]);

  const onLogin = ({ password, username }) => {
    showLoading();
    dispatch(asyncSetAuthUser({ password, username }))
      .finally(() => hideLoading());
  };

  if (!schoolData?.banner) {
    return <Loading />;
  }

  return (

    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: schoolData?.banner
          ? `url(${schoolData.banner})`
          : "url('/bg-login.jpg')",
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
        <LoginForm login={onLogin} schoolData={schoolData} />
      </Box>
    </Box>

  );
};

export default LoginPage;
