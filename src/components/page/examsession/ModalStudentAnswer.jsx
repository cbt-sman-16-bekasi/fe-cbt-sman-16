import Grid from "@mui/material/Grid2";
import {Dialog} from '@mui/material';
import TitleWithIcon from "../../common/TitleWithIcon.jsx";
import {PencilLine} from "lucide-react";
import Box from "@mui/material/Box";
import DetailItem from "../../common/DetailItem.jsx";
import BasicCard from "../../common/BasicCard.jsx";
import {useModalStudentAnswer} from "./hook/useModalStudentAnswer.js";
import ApiTable from "../../ApiTable.jsx";

export default function ModalStudentAnswer({ open, setHide, row, dataSession }) {

  const {
    columns
  } = useModalStudentAnswer({row: row, dataSession: dataSession, setHide: setHide})
  return (
    <Dialog open={open} onClose={() => setHide(false)} fullWidth maxWidth="lg"
            PaperProps={{
              sx: {
                marginTop: 4, // jarak dari atas
                alignSelf: 'flex-start', // posisikan ke atas
                borderRadius: 2,
              },
            }}>
      <Grid sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", p: 2, width: '100%' }}>
        <TitleWithIcon icon={<PencilLine sx={{ color: 'white' }} />} text='Detail Siswa' iconBackground="red" />
      </Grid>


      <BasicCard sx={{mb:4, padding: '20px', ml: 3, mr: 3}}>
        <DetailItem label="NISN" value={row?.nisn ?? '-'} />
        <DetailItem label="Nama Siswa" value={row?.name ?? '-'} />
        <DetailItem label="Kelas" value={row?.class ?? '-'} />
      </BasicCard>

      <BasicCard sx={{mb:4, padding: '20px', ml: 3, mr: 3, maxHeight: '500px', overflow: 'auto'}}>

        <ApiTable url={`/academic/exam/session/answer/student?exam_code=${dataSession?.exam?.code}&student_id=${row?.student_id}&session_id=${dataSession?.session_id}`}
                  isRefresh={false}
                  columns={columns}
                  isPagination={false} />
      </BasicCard>

    </Dialog >
  );
}
