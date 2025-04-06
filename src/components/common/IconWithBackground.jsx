import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export default function IconWithBackground({icon, bgColor = 'lightgray'}) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '20%',
        backgroundColor: bgColor,
      }}
    >
      {icon}
    </Box>
  )
}

IconWithBackground.propTypes = {
  icon: PropTypes.element.isRequired,
  bgColor: PropTypes.string.isRequired
}