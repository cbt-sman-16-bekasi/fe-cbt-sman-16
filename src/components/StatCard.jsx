import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function StatCard({ title, value, interval, trend, data }) {

  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1, pb: '0' }} >
      <CardContent className='flex flex-col gap-5 w-full h-full'>
        <div className="sumamry-content">
          <Typography gutterBottom variant='h2' sx={{ color: 'text.secondary' }}>
            {value}
          </Typography>
          <Typography variant="h5">
            {title}
          </Typography>
        </div>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>lihat detail</Typography>
      </CardContent>
    </Card >
  );
}

StatCard.propTypes = {
  interval: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
  value: PropTypes.string.isRequired,
};

export default StatCard;
