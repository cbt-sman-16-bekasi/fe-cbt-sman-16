import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';
import { Upload } from '@mui/icons-material';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';


export default function ImportDataSiswa({ addStudents, alert }) {
  const [file, setFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownloadTemplate = () => {
    const templateData = [
      { class_id: '', gender: '', name: '', nisn: '' }
    ];
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, 'template-import-siswa.xlsx');
  };

  const parseFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      const isCSV = file.name.endsWith('.csv');

      reader.onload = (event) => {
        const data = event.target.result;

        try {
          let parsedData;
          if (isCSV) {
            const result = Papa.parse(data, { header: true });
            parsedData = result.data;
          } else {
            const workbook = XLSX.read(data, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            parsedData = XLSX.utils.sheet_to_json(worksheet);
          }

          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      };

      if (isCSV) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  function resetInputs() {
    setFile('');
  }

  const handleSubmit = async () => {
    if (!file) {
      alert('error', 'File Wajib di Upload!');
      return;
    }

    setIsSubmitting(true);
    try {
      const parsedData = await parseFile(file);
      let successCount = 0;
      let failCount = 0;

      for (const row of parsedData) {
        if (!row.name || !row.gender || !row.class_id || !row.nisn) {
          console.warn('Data tidak lengkap di baris:', row);
          failCount++;
          continue;
        }

        try {
          await addStudents({
            name: row.name,
            gender: row.gender,
            class_id: Number(row.class_id),
            nisn: String(row.nisn).trim(),
          });
          successCount++;
        } catch (error) {
          failCount++;
          console.error('Gagal tambah siswa:', row, error);
        }
      }

      alert('success', `${successCount} siswa berhasil diimport.\n${failCount} gagal.`);
      resetInputs();
    } catch (err) {
      console.error(err);
      alert('error', err.message || `Terjadi kesalahan saat parsing file.`);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>

      <Typography component="h4" variant="h4">
        Import Data Siswa
      </Typography>

      <Typography component="p" variant="p">
        Silahkan untuk mengimpor data siswa. <b>Pastikan data yang Anda masukkan sesuai dengan template yang sudah telah disediakan!.</b> Jika Anda belum memiliki template, harap unduh template yang tersedia di sini <Link onClick={handleDownloadTemplate} className="cursor-pointer text-blue-600 hover:underline">
          <i>Unduh Template</i>
        </Link>
      </Typography>

      <Grid container spacing={3} alignItems="center" columns={12}>
        <Grid size={{ sm: 12 }}>
          <Card>
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
        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" className='bg-slate-800 text-white' onClick={() => resetInputs()}>Reset</Button>
        </Grid>

        <Grid size={{ lg: 1.5 }}>
          <Button fullWidth variant="contained" color='success' onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </Grid>
      </Grid>

    </>
  );
}

ImportDataSiswa.propTypes = {
  addStudents: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired,
}