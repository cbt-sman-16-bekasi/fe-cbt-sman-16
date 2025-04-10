import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../internals/components/Copyright';
import { Alert, AlertTitle, Button, InputAdornment, TextField } from '@mui/material';
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { columns } from "../internals/data/ujianData";
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { RocketLaunch } from "@mui/icons-material";
import ApiTable from "./ApiTable.jsx";
import { useState } from "react";

export default function Ujian({ role }) {
  const [search, setSearch] = useState('')

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} sx={{ my: 4 }} columns={12}>
        <Grid size={{ sm: 12 }}>
          <Alert icon={<RocketLaunch fontSize="small" color="info" />} variant="outlined" severity="info" sx={{ p: 1 }}>
            <AlertTitle fontSize="medium">Perhatian!</AlertTitle>
            Untuk menambahkan soal di setaip ujian, silahkan klik tombol <b>setting</b> <SettingsIcon sx={{ verticalAlign: "middle", fontSize: 18, color: "black", backgroundColor: 'yellow' }} />
          </Alert>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mb={4}>
        <Grid size={{ lg: 1.5 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Link to={`/${role}/ujian/tambah`}>
            <Button fullWidth variant="contained" color="info"><AddBoxOutlinedIcon /> Tambah</Button>
          </Link>
        </Grid>
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
      <Grid container spacing={1} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          {/*<CustomizedDataGrid columns={columns} rows={rows} />*/}
          <ApiTable url="/academic/exam/all" pageSize={10} columns={columns} searchKey="name" searchValue={search} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

Ujian.propTypes = {
  role: PropTypes.string.isRequired
}
