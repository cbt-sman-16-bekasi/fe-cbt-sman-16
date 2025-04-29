import { Chip, MenuItem, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CustomInput = ({
  label,
  value,
  onChange,
  type = "text",
  options = [],
  placeholder = "",
  fullWidth = true,
  oneLineInput = false,
  variant = "outlined",
  multiple = false,
  sx = {},
  subLabel = null
}) => {
  return (
    <Grid size={{ ...(oneLineInput ? { sm: 12 } : { md: 12, lg: 6 }), }} sx={{ display: "flex", flexDirection: "column", gap: 1, ...sx }}>
      {label && (
        <>
          <Typography variant="body1" fontWeight="bold">
            {label}
          </Typography>
          { subLabel && (subLabel)}
        </>
      )}
      {multiple ? (<Select
        labelId="multiple-subject-label"
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label="Pilih Mata Pelajaran" />}
        renderValue={(selected) => (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selected.map((value) => {
              const found = options.find(o => o.value === value);
              return <Chip key={value} label={found?.label || value} />;
            })}
          </div>
        )}
        variant={variant}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>) : type === 'customdate' ? (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={value}
          onChange={(newValue) => onChange(newValue)}
          ampm={false}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <div style={{ marginTop: 3, fontSize: 12 }}>
          <strong>Formatted:</strong>{' '}
          {value ? dayjs(value).format('DD-MM-YYYY HH:mm:ss') : ''}
        </div>
      </LocalizationProvider>) : (<TextField
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
      </TextField>)}
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
  oneLineInput: PropTypes.bool,
  variant: PropTypes.string,
  sx: PropTypes.object,
  multiple: PropTypes.bool
}