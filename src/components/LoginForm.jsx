import { useState } from "react";
import Grid from '@mui/material/Grid2';
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import PropTypes from "prop-types";
import BasicCard from "./common/BasicCard.jsx";

const LoginForm = ({ login, schoolData }) => {
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
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.common.white,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          {schoolData && (
            <img src="/sinau-logo-remove.png" alt="Logo Sekolah" width={300} height={90} />
          )}
        </Box>
        <CardContent>
          <Grid container spacing={2} alignItems="center" columns={12} sx={{ padding: 2 }}>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <Typography variant="subtitle2" sx={{ color: (theme) => theme.palette.text.main}} pb={1} >
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
              <Typography variant="subtitle2"  sx={{ color: (theme) => theme.palette.text.main}} >
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
                sx={{
                  textAlign: "left",
                  width: "100%",
                  color: (theme) => theme.palette.text.primary,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                }}
              />
            </Grid>

            { username && password && (
              <Grid size={{ sm: 12 }}>
                <Button
                  onClick={handleLogin}
                  fullWidth variant="contained" color="info"
                  sx={{
                    mt: 2,
                  }}
                >
                  Masuk
                </Button>
              </Grid>
            )}
          </Grid>

        </CardContent>

      </Card>
      <Typography variant="body2" sx={{ mt: 2, fontSize: 12 }}>
        © 2025 SINAU - Academic Management System. All Rights Reserved.
      </Typography>
    </Container>

  );
};

export default LoginForm;

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  schoolData: PropTypes.object.isRequired,
};