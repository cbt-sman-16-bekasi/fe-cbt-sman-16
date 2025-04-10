import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Button, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router';
import { Upload } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Papa from 'papaparse';
import { asyncReceiveStudents } from '../states/students/action';
import { useDispatch, useSelector } from 'react-redux';
import useApi from "../utils/rest/api.js";
import {useLoading} from "./common/LoadingProvider.jsx";
import {useModal} from "./common/ModalContext.jsx";


export default function ImportDataSiswa({ addStudents, alert }) {
  const students = useSelector((state) => state.students.students);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {showLoading, hideLoading} = useLoading()
  const {showModal} = useModal()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncReceiveStudents())
  }, [dispatch])

  const handleSubmit = async () => {
    try {

      showLoading()
      const { message, status } = await useApi.uploadFile({
        url: `/academic/student/template/upload`,
        file: file,
        fieldName: 'file'
      });

      console.log(message, status);
      showModal(message, status)
      hideLoading();
      if (status === 'success') {
        navigate(-1);
      }
    } catch (e) {
      console.log("Error uplaod student", e)
      hideLoading()
      showModal("Failed upload student", "error")
    }
  };

  const handleDownloadTemplate = async () => {
    await useApi.download({url: `/academic/student/template/download`})
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
                Upload File berbentuk Excel
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