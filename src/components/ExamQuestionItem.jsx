import { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  IconButton,
  MenuItem,
  Stack,
  FormControl,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomCkEditor from "./CustomCkEditor";
import PropTypes from "prop-types";

export default function ExamQuestionItem({ questionData, onDelete }) {
  const [required, setRequired] = useState(false);
  const [questionType, setQuestionType] = useState(questionData.type);
  const [options, setOptions] = useState([""]);
  const [selectedOption, setSelectedOption] = useState(null);
  const lastInputRef = useRef(null);
  // const [questionType, setQuestionType] = useState("Pilihan ganda");

  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }, [options]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  return (
    <Card sx={{ width: "100%", margin: "auto", mt: 2, borderRadius: 2, p: 5 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" sx={{ display: 'flex' }}>

          <Grid size={{ sm: 8 }} sx={{ display: "flex", justifyContent: "flex-start" }}>
            <CustomCkEditor type='inline' />
          </Grid>

          <Grid size={{ sm: 4 }} sx={{ display: "flex", justifyContent: "flex-start", gap: '0.3rem' }}>
            <IconButton>
              <ImageIcon />
            </IconButton>

            <TextField
              fullWidth
              select
              size="small"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              sx={{ minWidth: '150px' }}
            >
              <MenuItem value="Pilihan ganda">Pilihan ganda</MenuItem>
              <MenuItem value="Essai">Essai</MenuItem>
            </TextField>
          </Grid>

        </Grid>

        <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center">
          <Grid size={{ sm: 12 }} sx={{ display: "flex", justifyContent: "flex-start" }}>

            {questionType === "Pilihan ganda" ? (
              <FormControl sx={{ width: "100%" }}>
                <RadioGroup name="options"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  sx={{ width: "100%" }}>
                  {options.map((option, index) => (
                    <Stack key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', gap: '0.3rem' }}>
                      <FormControlLabel
                        sx={{
                          width: '100%',
                          display: "flex",
                          alignItems: "center",
                          border: '1px solid white',
                          '.MuiFormControlLabel-label': { flex: 1 }
                        }}
                        control={<Radio value={index} />}
                        label={
                          <TextField
                            fullWidth
                            variant="standard"
                            placeholder={`Opsi ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...options];
                              newOptions[index] = e.target.value;
                              setOptions(newOptions);
                            }}
                            sx={{ flex: 1 }}
                            inputRef={index === options.length - 1 ? lastInputRef : null}
                          />
                        }
                      />
                      <IconButton>
                        <ImageIcon />
                      </IconButton>
                      <IconButton onClick={() => setOptions(options.filter((_, i) => i !== index))}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}

                  {/* Tombol Tambah Opsi */}
                  <FormControlLabel
                    sx={{ width: "100%", display: "flex", alignItems: "center" }}
                    control={<Radio disabled />}
                    label={
                      <div style={{ width: "100%" }}>
                        <TextField
                          fullWidth
                          variant="standard"
                          placeholder="Tambah Opsi"
                          onFocus={handleAddOption}
                          sx={{ flex: 1 }}
                        />
                      </div>
                    }
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              <TextField fullWidth disabled placeholder="Jawaban singkat..." variant="outlined" sx={{ mt: 2 }} />
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} columns={12} justifyContent="start" alignItems="center" mt={2}>
          <Grid size={{ sm: 12 }} sx={{ display: "flex", justifyContent: "flex-end", gap: "1.3rem" }}>
            <Stack sx={{ display: "flex", flexDirection: "row", gap: "0.2rem" }}>
              {/* <IconButton>
                <AddIcon />
              </IconButton> */}
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </Stack>
            <FormControlLabel
              control={<Switch checked={required} onChange={() => setRequired(!required)} />}
              label="Wajib diisi"
            />
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
}

ExamQuestionItem.propTypes = {
  questionData: PropTypes.array,
  onDelete: PropTypes.func
}