import {Card, CardContent} from "@mui/material";
import PropTypes from "prop-types";

export default function BasicCard({ children, sx = {} }) {
  return (
    <Card variant="outlined" sx={{ flexGrow: 1, mb: 9, ...sx }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
        {children}
      </CardContent>
    </Card>
  )
}

BasicCard.propTypes = {
  children: PropTypes.element,
  sx: PropTypes.object
}