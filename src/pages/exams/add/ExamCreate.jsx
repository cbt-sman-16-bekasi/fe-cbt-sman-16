import Box from "@mui/material/Box";
import {LockOutlined} from "@mui/icons-material";
import BackWithTitle from "../../../components/common/BackWithTitle.jsx";
import {Button, Card, CardContent, MenuItem, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import CustomCkEditor from "../../../components/CustomCkEditor.jsx";

export function ExamCreate() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle title="Tambah Ujian" icon={<LockOutlined />} />
      <Card variant="outlined" sx={{ flexGrow: 1, mb: 9 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '2.3rem' }}>
          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nama Ujian
              </Typography>
              <TextField
                fullWidth
                // value={ujian}
                // onChange={(e) => setUjian(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nama Mata Pelajaran
              </Typography>
              <TextField
                fullWidth
                select
                // value={mapel}
                // onChange={(e) => setMapel(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Kelas
              </Typography>
              <TextField
                fullWidth
                select
                // value={kelas}
                // onChange={(e) => setKelas(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="lak-laki">Lak-Laki</MenuItem>
                <MenuItem value="perempuan">Perempuan</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Jenis Ujian
              </Typography>
              <TextField
                fullWidth
                select
                // value={jenisUjian}
                // onChange={(e) => setJenisUjian(e.target.value)}
                variant="outlined"
              >
                <MenuItem value='10'>10</MenuItem>
                <MenuItem value='11'>11</MenuItem>
                <MenuItem value='12'>12</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>
            <Grid size={{ lg: 12 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Deskripsi Ujian
              </Typography>

              <CustomCkEditor type="classic" />

            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Acak Soal
              </Typography>
              <TextField
                fullWidth
                select
                // value={acakSoal}
                // onChange={(e) => setAcakSoal(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="ya">Ya</MenuItem>
                <MenuItem value="tidak">Tidak</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Acak Jawaban
              </Typography>
              <TextField
                fullWidth
                select
                // value={acakJawaban}
                // onChange={(e) => setAcakJawaban(e.target.value)}
                variant="outlined"
              >
                <MenuItem value='ya'>Ya</MenuItem>
                <MenuItem value='tidak'>Tidak</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" columns={12}>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tampilkan Hasil Akhir
              </Typography>
              <TextField
                fullWidth
                select
                // value={hasilAkhir}
                // onChange={(e) => setHasilAkhir(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="ya">Ya</MenuItem>
                <MenuItem value="tidak">Tidak</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ md: 12, lg: 6 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Durasi
              </Typography>
              <TextField
                fullWidth
                // value={durasi}
                // onChange={(e) => setDurasi(e.target.value)}
                variant="outlined"
              >
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} columns={12} justifyContent="end" alignItems="center" mb={2}>
            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="outlined" color='secondary'>Reset</Button>
            </Grid>

            <Grid size={{ lg: 1.5 }}>
              <Button fullWidth variant="contained" color='cbtPrimary' >Simpan</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}