import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Link, useLocation } from 'react-router';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

const breadcrumbNameMap = {
  '/': 'Dashboard',
  '/akses-system': 'Akses System',
  '/kelas': 'Kelas',
  '/mata-pelajaran': 'Mata Pelajaran',
  '/kode-jenis-ujian': 'Kode Jenis Ujian',
  '/data-siswa': 'Data Siswa',
  '/ujian': 'Ujian',
  '/sesi-ujian': 'Sesi Ujian',
  '/generate-token': 'Generate Token Ujian',
  '/laporan-nilai': 'Laporan Nilai',
  '/settings': 'Settings',
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="body1">CBT</Typography>
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const breadcrumbLabel = breadcrumbNameMap[to] || capitalizeFirstLetter(value);

        return isLast ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {breadcrumbLabel}
          </Typography>
        ) : (
          <Link key={to} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body1">{breadcrumbLabel}</Typography>
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}
