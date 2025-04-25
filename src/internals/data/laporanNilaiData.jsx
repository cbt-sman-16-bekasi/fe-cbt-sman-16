import { PanoramaWideAngleSelect } from "@mui/icons-material";
import { Button } from "@mui/material";

export const columns = [
  { field: "no", headerName: "NO", flex: 0.1, minWidth: 50 },
  { field: "namaUjian", headerName: "NAMA UJIAN", flex: 1, minWidth: 200 },
  {
    field: "detailUjian",
    headerName: "DETAIL UJIAN",
    flex: 2,
    minWidth: 400,
    renderCell: (params) => (
      <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
        <strong>Jenis Ujian:</strong> {params.row.jenisUjian} <br />
        <strong>Mata Pelajaran:</strong> {params.row.mataPelajaran} <br />
        <strong>Kelas:</strong> {params.row.kelas} <br />
        <strong>Nama Sesi:</strong> {params.row.namaSesi} <br />
        <strong>Mulai:</strong> {params.row.mulai} <br />
        <strong>Selesai:</strong> {params.row.selesai}
      </div>
    ),
  },
  { field: "totalSiswa", headerName: "TOTAL SISWA", flex: 1, minWidth: 100 },
  {
    field: "aksi",
    headerName: "AKSI",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "purple",
          color: "white",
          textTransform: "none",
          "&:hover": { backgroundColor: "darkviolet" },
        }}
        onClick={() => handleDownload(params.row.fileUrl, params.row.namaUjian)}
      >
        Unduh
      </Button>
    ),
  },
];

const handleDownload = (fileUrl, namaUjian) => {
  if (!fileUrl) {
    alert('File tidak tersedia');
    return;
  }

  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = `${namaUjian}.xlsx`;
  document.body.appendChild(link);
  link.click();

  if (document.body.contains(link)) {
    document.body.removeChild(link);
  }
};


export const rows = [
  {
    id: 1,
    no: 1,
    namaUjian: "UTS PKN 21 FEBRUARI",
    jenisUjian: "UTS",
    mataPelajaran: "Pendidikan Kewarganegaraan",
    kelas: "Seluruh Kelas 12",
    namaSesi: "UAS HARI-1",
    mulai: "2025-02-20 07:30:00",
    selesai: "2025-02-20 10:00:00",
    totalSiswa: 32,
  },
];

