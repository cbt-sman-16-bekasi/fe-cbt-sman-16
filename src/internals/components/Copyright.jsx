import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function Copyright(props) {
  return (
    <Typography
      variant="caption"
      align="center"
      {...props}
      sx={[
        {
          color: 'gray',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {`© ${new Date().getFullYear()} `}
      <Link
        color="gray"
        href="https://sman16-bekasi.sch.id/"
        target="_blank"
        rel="noopener noreferrer"
      >
        SMAN 16 Kota Bekasi.
      </Link>

      <br />
      All Right Reserved.
    </Typography>
  );
}

Copyright.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.func,
  ]),
};