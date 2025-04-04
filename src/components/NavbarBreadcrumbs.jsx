import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Link, useLocation, useParams } from 'react-router';
import PropTypes from 'prop-types';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const breadcrumbNameMapByRole = {
  superadmin: {
    "/": "Dashboard",
    "/akses-system": "Akses System",
    "/settings": "Settings",
    "/ujian": "Ujian",
    "/ujian/settings": "Settings",
  },
  admin: {
    "/": "Dashboard",
    "/kelas": "Kelas",
    "/mata-pelajaran": "Mata Pelajaran",
    "/data-siswa": "Data Siswa",
    "/settings": "Settings",
  },
  teacher: {
    "/": "Dashboard",
    "/ujian": "Ujian",
    "/sesi-ujian": "Sesi Ujian",
    "/generate-token": "Generate Token Ujian",
    "/laporan-nilai": "Laporan Nilai",
  },
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function NavbarBreadcrumbs({ role }) {
  const location = useLocation();
  const params = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x).slice(1);
  const breadcrumbNameMap = breadcrumbNameMapByRole[role] || {};

  // Cek apakah path terakhir adalah ID (angka)
  const lastSegment = pathnames[pathnames.length - 1];
  const isId = /^\d+$/.test(lastSegment);

  // Hilangkan ID dari breadcrumb
  const breadcrumbPaths = isId ? pathnames.slice(0, -1) : pathnames;

  return (
    <>
      <StyledBreadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextRoundedIcon fontSize="small" />}
      >
        <Typography variant="body1" style={{ color: "inherit" }}>CBT</Typography>

        {breadcrumbPaths.map((value, index) => {
          const to = `/${role}/${breadcrumbPaths.slice(0, index + 1).join("/")}`;
          const isLast = index === breadcrumbPaths.length - 1;
          const breadcrumbLabel = breadcrumbNameMap[to] || capitalizeFirstLetter(value);

          return isLast ? (
            <Typography
              key={to}
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {breadcrumbLabel}
            </Typography>
          ) : (
            <Link key={to} to={to} style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="body1">{breadcrumbLabel}</Typography>
            </Link>
          );
        })}
      </StyledBreadcrumbs>
    </>
  );
}

NavbarBreadcrumbs.propTypes = {
  role: PropTypes.string.isRequired,
};
