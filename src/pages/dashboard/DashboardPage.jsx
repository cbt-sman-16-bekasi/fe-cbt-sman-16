import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { MenuConfig } from '../../config/MenuConfig3';
import { useDashboardPageHook } from './hooks/useDashboardPageHook';
// import { InputAdornment, TextField } from '@mui/material';
// import SearchIcon from "@mui/icons-material/Search";
// import ApiTable from '../../components/ApiTable';
import { asyncGetDashboardData } from '../../states/common/action';
import { useEffect } from 'react';
import StatisticCard from "../../components/StatisticCard.jsx";

export default function DashboardPage() {
  const dispatch = useDispatch()
  const {
    // search,
    // setSearch,
    userRole,
    // columns
  } = useDashboardPageHook()

  const dashboardData = useSelector((state) => state.common.dashboardData);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncGetDashboardData())
  }, [dispatch])

  const updatedMenuItems = MenuConfig.filter((item) => item.allowRole.includes(authUser.role.code)).map((item) => {
    const keyMap = {
      '/akses-system': 'total_access',
      '/kelas': 'total_class',
      '/mata-pelajaran': 'total_subject',
      '/data-siswa': 'total_student',
      '/ujian': 'total_exam',
      '/sesi-ujian': 'total_active_session_exam',
      '/laporan-nilai': 'total_report_exam',
    };

    return {
      ...item,
      value: dashboardData[keyMap[item.path]] ?? '0',
      icon: item.icon,
    };
  });

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, pb: 3 }}>
      {/* overview datas */}
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>

          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Ikhtisar
          </Typography>
          <Grid
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(2) }}
          >
            {updatedMenuItems.map((card, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4, lg: 3 }}>
                <StatisticCard role={userRole} card={card} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* exam details */}
      {/* <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>
          <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
            Detail Ujian
          </Typography>

          <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
            <Grid lg={4}>
              <TextField
                variant="outlined"
                placeholder="Cari Berdasarkan..."
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} columns={12} sx={{
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            '& > div': {
              borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            }
          }}>
            <Grid size={{ xs: 12, lg: 12 }}>
              <ApiTable url="/academic/dashboard" pageSize={10} columns={columns} searchKey="name" searchValue={search} />
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}

    </Box>
  );
}
