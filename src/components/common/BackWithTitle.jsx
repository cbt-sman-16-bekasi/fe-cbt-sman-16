import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

export default function BackWithTitle({ title, icon }) {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2} columns={12} sx={{ display: "flex", justifyContent: "flex-start", mb: 3, alignItems: "center" }}>
        <Grid size={{ sm: 2 }} sx={{ maxWidth: 110 }}>
          <Button fullWidth variant="contained" color="cbtPrimary"
            onClick={async () => await navigate(-1)}
            startIcon={<ArrowBack />}> Kembali</Button>
        </Grid>
        <Typography variant='h5' sx={{ alignItems: 'center' }}>
          {icon} {title}
        </Typography>
      </Grid>
    </>
  )
}

BackWithTitle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element
}