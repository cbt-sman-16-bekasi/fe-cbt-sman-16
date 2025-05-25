import * as Icons from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function StatCard({ card, role }) {
  const { text, value, path, icon } = card;
  const pathMenu = `/${role}${path}`;
  const IconComponent = Icons[icon];

  const to = (menu) => {
    localStorage.setItem("currentMenu", JSON.stringify(menu));
  }

  return (
    <div className="h-full rounded-2xl overflow-hidden shadow-lg">
      {/* Bagian Atas */}
      <div className="bg-purple-600 p-7 flex flex-col gap-2 relative">
        <p className="text-white text-5xl font-extrabold">{value}</p>
        <p className="text-white text-lg">{text}</p>
        <div className="absolute top-1 right-1 w-[35%] h-full text-white/40 text-5xl">
          <IconComponent sx={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      <Link to={pathMenu} className="bg-gray-900 p-5 text-white flex justify-between items-center cursor-pointer hover:bg-gray-800 transition">
        <span className='text-white'>Lihat Detail</span>
        <span className='text-white'>→</span>
      </Link>
    </div>
  );
}

StatCard.propTypes = {
  card: PropTypes.shape({
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default StatCard;