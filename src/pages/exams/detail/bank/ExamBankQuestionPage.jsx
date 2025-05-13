import BackWithTitle from "../../../../components/common/BackWithTitle.jsx";
import Box from "@mui/material/Box";
import {useExamBankQuestionHook} from "./hook/useExamBankQuestionHook.js";
import {Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Save} from "lucide-react";

const ExamBankQuestionPage = () => {
  const {
    rows,
    selected,
    isSelected,
    handleClick,
    handleSelectAllClick,
    handleSave
  } = useExamBankQuestionHook()
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, my: 3 }}>
      <BackWithTitle />

      <Grid display="flex" width="20%" sx={{ mb: 2, lg: 4}}>
        <Button fullWidth variant="contained" color="error"
                disabled={selected?.length === 0}
                onClick={handleSave}
                startIcon={<Save />}> Tambahkan Soal</Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow  sx={{ backgroundColor: "#130A36", textAlign: 'center' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Question</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Jawaban</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isItemSelected = isSelected(row?.ID);
              return (
                <TableRow
                  hover
                  key={row?.ID}
                  role="checkbox"
                  selected={isItemSelected}
                  onClick={(event) => handleClick(event, row?.ID)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: row.question }}></TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: row.answer_single }}></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ExamBankQuestionPage