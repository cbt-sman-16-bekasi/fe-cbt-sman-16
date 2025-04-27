import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

export default function DetailItem({ label, value }) {
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Jenis Ujian */}
      <Grid container sx={{ paddingX: '20px' }}>
        <Grid size={{ xs: 6, md: 2 }}>
          <span >
            {label}
          </span>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          {value}
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider sx={{ mt: 0 }} />
      </Grid>
    </Grid>
  )
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any
}