import { useState } from "react";
import Grid from '@mui/material/Grid2';
import {
  Card,
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

const RegistForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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

            <Grid size={{ sm: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '.4rem' }}>
              <Typography variant="subtitle2" fontWeight="bold" >
                Username
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
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
              {/* Tombol Login */}
              <Button
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

export default RegistForm;
