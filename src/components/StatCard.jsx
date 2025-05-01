import PropTypes from 'prop-types';
import { Link } from 'react-router';

function StatCard({ card, role }) {
  const { text, value, path } = card;
  const pathMenu = `/${role}${path}`;

  const to = (menu) => {
    localStorage.setItem("currentMenu", JSON.stringify(menu));
  }

  return (
    <div className="h-full rounded-2xl overflow-hidden shadow-lg">
      {/* Bagian Atas */}
      <div className="bg-purple-600 p-7 flex flex-col gap-2 relative">
        <p className="text-white text-5xl font-extrabold">{value}</p>
        <p className="text-white text-lg">{text}</p>
        <div className="absolute top-1 right-1 text-white/40 text-5xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-28 h-28"
          >
            <path
              fillRule="evenodd"
              d="M6.25 4.5A2.25 2.25 0 0 0 4 6.75v2.5A2.25 2.25 0 0 0 6.25 11.5h2.5A2.25 2.25 0 0 0 11 9.25v-2.5A2.25 2.25 0 0 0 8.75 4.5h-2.5zm9 0A2.25 2.25 0 0 0 13 6.75v2.5a2.25 2.25 0 0 0 2.25 2.25h2.5A2.25 2.25 0 0 0 20 9.25v-2.5A2.25 2.25 0 0 0 17.75 4.5h-2.5zm-9 9A2.25 2.25 0 0 0 4 15.75v2.5A2.25 2.25 0 0 0 6.25 20.5h2.5A2.25 2.25 0 0 0 11 18.25v-2.5A2.25 2.25 0 0 0 8.75 13.5h-2.5zm9 0A2.25 2.25 0 0 0 13 15.75v2.5a2.25 2.25 0 0 0 2.25 2.25h2.5A2.25 2.25 0 0 0 20 18.25v-2.5A2.25 2.25 0 0 0 17.75 13.5h-2.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <Link onClick={() => to(card, pathMenu)} to={pathMenu} className="bg-gray-900 p-5 text-white flex justify-between items-center cursor-pointer hover:bg-gray-800 transition">
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
  }).isRequired,
  role: PropTypes.string.isRequired,
};

export default StatCard;