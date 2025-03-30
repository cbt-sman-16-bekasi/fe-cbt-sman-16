import { useState } from "react";
import Grid from '@mui/material/Grid2';
import {
  Card,
  Alert,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

// const users = JSON.parse(localStorage.getItem("users")) || [];
// const user = users.find(
//   (u) => u.username === username && u.password === password
// );

// const navigate = useNavigate();

// if (user) {
//   localStorage.setItem("authUser", JSON.stringify(user));
//   navigate(`/${user.akses}/dashboard`);
// } else {
//   alert("Username atau password salah!");
// }

const LoginForm = ({ login }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login({ password, username });
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <Card
        sx={{
          p: 2,
          width: 400,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src="/logo-sman16.png" alt="Logo Sekolah" width={90} height={90} />
        </Box>

        {/* Judul */}
        <Typography variant="h6" fontWeight="bold" gutterBottom align={'center'}>
          COMPUTER BASED TEST <br /> SMAN 16 BEKASI
        </Typography>

        {/* Form Login */}
        <CardContent>
          <Grid container spacing={2} alignItems="center" columns={12} sx={{ padding: 2 }}>

            {/* <Grid size={{ sm: 12 }}>
              <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined"
                severity="info"
                sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Perhatian!
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Silahkan klik Generate Token untuk dapat mendapatkan token yang akan diberikan ke siswa. Masa aktif token berlaku selama satu hari.
                </Typography>
              </Alert>
            </Grid> */}

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <Typography variant="subtitle2" fontWeight="bold" pb={1} >
                Username
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <Typography variant="subtitle2" fontWeight="bold" pb={1} >
                Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ sm: 12 }}>
              <FormControlLabel
                control={<Checkbox onChange={() => setShowPassword(!showPassword)} />}
                label="Show Password"
                sx={{ textAlign: "left", width: "100%" }}
              />
            </Grid>

            <Grid size={{ sm: 12 }}>
              <Button
                onClick={handleLogin}
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#7C3AED",
                  "&:hover": { bgcolor: "#6B21A8" },
                }}
              >
                Masuk
              </Button>
            </Grid>
          </Grid>

        </CardContent>

      </Card>
      <Typography variant="body2" sx={{ mt: 2, fontSize: 12 }}>
        © 2025 SMAN 16 Kota Bekasi. All Rights Reserved.
      </Typography>
    </Container>

  );
};

export default LoginForm;

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};