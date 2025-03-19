import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router";

export default function NotFoundPage({ role }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Oops! Halaman yang kamu cari tidak ditemukan.
        </Typography>
        <Button variant="contained" component={Link} to={`/${role}/dashboard`} sx={{ mt: 2 }}>
          Kembali ke Beranda
        </Button>
      </Stack>
    </Box >
  );
}
