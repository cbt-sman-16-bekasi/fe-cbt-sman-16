import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { ButtonBase } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router';
import * as Icons from "@mui/icons-material";
import PropTypes from 'prop-types';

const StatisticCard = ({ card, role }) => {

  const { text, value, path, icon } = card;
  const pathMenu = `/${role}${path}`;
  const IconComponent = Icons[icon];

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 1,
        boxShadow: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        p: 0
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          position: 'relative',
          backgroundColor: 'primary.main', // Use the provided color or a default
        }}
      >
        <Typography variant="h3" component="p" sx={{ fontWeight: 'extrabold', color: 'white' }}>
          {value}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'white' }}>
          {text}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: '35%',
            height: '100%',
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <IconComponent sx={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
      <ButtonBase
        component={Link}
        to={pathMenu}
        sx={{
          width: '100%',
          backgroundColor: 'grey.900',
          pl: 2,
          pr: 2,
          pt: 1,
          pb: 1,
          color: 'white',
          justifyContent: 'space-between',
          '&:hover': {
            backgroundColor: 'grey.800',
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ color: 'white' }}>
          Lihat Detail
        </Typography>
        <Typography variant="body1" sx={{ color: 'white' }}>
          →
        </Typography>
      </ButtonBase>
    </Card>
  );
};

StatisticCard.propTypes = {
  card: PropTypes.shape({
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default StatisticCard;