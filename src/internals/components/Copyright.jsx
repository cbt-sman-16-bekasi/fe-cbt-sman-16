import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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
      <Link color="gray" href="https://mui.com/">
        SMAN 16 Kota Bekasi.
      </Link>
      <br />
      All Right Reserved.
    </Typography>
  );
}
