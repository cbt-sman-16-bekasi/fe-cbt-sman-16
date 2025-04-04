import {MenuItem, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const CustomInput = ({
                       label,
                       value,
                       onChange,
                       type = "text",
                       options = [],
                       placeholder = "",
                       fullWidth = true,
                       variant = "outlined",
                       sx = {},
                     }) => {
  return (
    <Grid item size={{ md: 12, lg: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 1, ...sx }}>
      {label && (
        <Typography variant="body1" fontWeight="bold">
          {label}
        </Typography>
      )}
      <TextField
        fullWidth={fullWidth}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant={variant}
        select={options.length > 0}
      >
        {options.length > 0 &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  );
};

export default CustomInput;

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  sx: PropTypes.object
}