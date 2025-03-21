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

const LoginForm = ({ setAuthUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      setAuthUser(user);

      navigate(`/${user.akses}/dashboard`);
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <Card
        sx={{
          p: 2,
          width: 400,
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src="/logo-sman16.png" alt="Logo Sekolah" width={90} height={90} />
        </Box>

        {/* Judul */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          COMPUTER BASED TEST <br /> SMAN 16 BEKASI
        </Typography>

        {/* Form Login */}
        <CardContent>
          <Grid container spacing={2} columns={12} sx={{ p: 1 }}>
            {/* <Grid  size={{ sm: 12 }}>
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

            <Grid size={{ sm: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '.4rem' }}>
              <Typography variant="subtitle2" fontWeight="bold" >
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

            <Grid size={{ sm: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '.4rem' }}>
              <Typography variant="subtitle2" fontWeight="bold" >
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

            {/* Tombol Login */}
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
