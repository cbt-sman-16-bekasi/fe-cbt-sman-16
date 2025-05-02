// UnderMaintenance.jsx
import { Box, Typography, Container } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const UnderMaintenance = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <WarningAmberIcon sx={{ fontSize: 80, color: '#ff9800', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Under Maintenance
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page is currently under maintenance. <br />
          Please check back again later.
        </Typography>
      </Box>
    </Container>
  );
};

export default UnderMaintenance;
