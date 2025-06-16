import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useApi from "../../../../utils/rest/api.js";
import {useDebounce} from "../../../../hooks/useDebounce.js";
import {useLoading} from "../../../common/LoadingProvider.jsx";
import {useModal} from "../../../common/ModalContext.jsx";

export function useModalStudentAnswer({row, dataSession, setHide}) {

  const authUser = useSelector((state) => state.authUser);
  const userRole = authUser?.role?.code.toLowerCase();


  const columns = [
    { field: "no", headerName: "NO", flex: 0.2, minWidth: 50 },
    { field: "answer_single", headerName: "KUNCI JAWABAN", flex: 0.2, minWidth: 50 },
    { field: "answer_user", headerName: "JAWABAN SISWA", flex: 0.2, minWidth: 50, renderCell: (row) => row.answer_user?.split("_")[1] },
    { field: "score", headerName: "NILAI", flex: 0.2, minWidth: 50 },
    ]

  return {
    userRole,
    columns
  }
}