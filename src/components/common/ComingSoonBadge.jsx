import Box from "@mui/material/Box";

export default function ComingSoonBadge({label = 'Coming Soon', background = '#f50057', color = 'white'}) {
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: background,
        color: color,
        fontSize: '0.6rem',
        px: 1,
        py: 0.2,
        borderRadius: '4px',
        lineHeight: 1.2,
        width: '80px',
      }}
    >
      {label}
    </Box>
  )
}