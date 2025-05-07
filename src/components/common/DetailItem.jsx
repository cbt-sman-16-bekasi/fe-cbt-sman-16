import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DetailItem({ label, value }) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0 }}>
        {/* Label kiri, lebar tetap */}
        <Box sx={{ width: 300, minWidth: 140 }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ lineHeight: 1.2, m: 0 }}>
            {label}
          </Typography>
        </Box>

        {/* Value kanan, sisa ruang */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.2, m: 0 }}>
            {value}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  )
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any
}