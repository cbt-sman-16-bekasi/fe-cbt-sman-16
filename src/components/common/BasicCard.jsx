import {Card, CardContent} from "@mui/material";
import PropTypes from "prop-types";

export default function BasicCard({ children, sx = {mb: 9}, gap = '2.3rem' }) {
  return (
    <Card variant="outlined" sx={{ flexGrow: 1, ...sx }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: gap }}>
        {children}
      </CardContent>
    </Card>
  )
}

BasicCard.propTypes = {
  children: PropTypes.element,
  sx: PropTypes.object,
  gap: PropTypes.string
}