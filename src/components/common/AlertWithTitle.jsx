import Grid from "@mui/material/Grid2";
import {Alert, AlertTitle} from "@mui/material";
import PropTypes from "prop-types";

export default function AlertWithTitle({title = 'Perhatian!', message = '', variant = 'outlined', severity = 'info', icon }) {
  return (
    <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
      <Grid size={{ sm: 12 }}>
        <Alert icon={icon} variant={variant} severity={severity} sx={{ p: 1 }}>
          <AlertTitle fontSize="medium">{title}</AlertTitle>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      </Grid>
    </Grid>
  )
}

AlertWithTitle.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  variant: PropTypes.string,
  severity: PropTypes.string,
  icon: PropTypes.element
}