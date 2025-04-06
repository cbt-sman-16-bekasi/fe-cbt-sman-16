import {useEffect, useState} from "react";
import useDate from "../../../hooks/useDate.js";

export function useGenerateTokenHook() {
  const [token, setToken] = useState('-');
  const dateHelper = useDate();
  const columns = [
    { field: "no", headerName: "NO", flex: 0.2, minWidth: 50 },
    { field: "token", headerName: "TOKEN", flex: 0.2, minWidth: 50 },
    { field: "detail_exam_session.detail_exam.name", headerName: "NAMA UJIAN", flex: 0.2, minWidth: 50, renderCell: (row) => row.detail_exam_session.detail_exam.name },
    { field: "detail_exam_session.name", headerName: "SESI UJIAN", flex: 0.2, minWidth: 50, renderCell: (row) => row.detail_exam_session.name },
    { field: "CreatedAt", headerName: "WAKTU GENERATE", flex: 0.2, minWidth: 50, renderCell: (row) => dateHelper.formattedWithTime(row.CreatedAt) },
    { field: "start_active_token", headerName: "WAKTU MULAI", flex: 0.2, minWidth: 50, renderCell: (row) => dateHelper.formattedWithTime(row.start_active_token) },
    { field: "end_active_token", headerName: "WAKTU SELESAI", flex: 0.2, minWidth: 50, renderCell: (row) => dateHelper.formattedWithTime(row.end_active_token) },
    { field: "status", headerName: "STATUS", flex: 0.2, minWidth: 50 },
  ]

  useEffect(() => {
    console.log(token)
  }, [token]);

  return {
    token, setToken,
    columns
  }

}