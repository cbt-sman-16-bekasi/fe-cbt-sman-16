import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Card, CardContent, TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';
import { Upload } from '@mui/icons-material';

export default function ImportDataSiswa({ setError }) {
  const [nisn, setNisn] = useState('')
  const [namaSiswa, setNamaSiswa] = useState('')
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <>

      <Typography component="h4" variant="h4">
        Import Data Siswa
      </Typography>

      <Typography component="p" variant="p">
        Silahkan untuk mengimpor data siswa. <b>Pastikan data yang Anda masukkan sesuai dengan template yang sudah telah disediakan!.</b> Jika Anda belum memiliki template, harap unduh template yang tersedia di sini <Link><i>Unduh Template</i></Link>
      </Typography>

      <Grid container spacing={3} alignItems="center" columns={12}>
        <Grid item size={{ lg: 12 }}>
          <Card fullWidth>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2 w-full h-40 relative">
              <Upload className="w-10 h-10 " />
              <Typography variant="body1" className="text-gray-700 font-medium">
                Upload File Data Disini
              </Typography>
              <label htmlFor="fileUpload" className="text-purple-600 hover:underline text-sm cursor-pointer">
                Upload File berbentuk Excel / CSV
              </label>
              <input
                id="fileUpload"
                type="file"
                accept=".csv, .xls, .xlsx"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </CardContent>
          </Card>
          {file && (
            <Typography variant="body2" className="mt-2 text-gray-600 text-center">
              File: {file.name}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
        <Grid item size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={() => setError()}>Reset</Button>
        </Grid>

        <Grid item size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success'>Simpan</Button>
        </Grid>
      </Grid>

    </>
  );
}
