import IconWithBackground from "./IconWithBackground.jsx";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function TitleWithIcon({icon,text,iconBackground}) {
  return (
    <Typography variant="h5" fontWeight="bold" sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
      <IconWithBackground icon={icon} bgColor={iconBackground} /> {text}
    </Typography>
  )
}
TitleWithIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  iconBackground: PropTypes.string
}