import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, IconButton } from "@mui/material";
import ExamQuestionItem from "./ExamQuestionItem";
import AddIcon from '@mui/icons-material/Add';

export default function ExamQuestionList() {
  const [questions, setQuestions] = useState([
    { id: 1, type: "Pilihan ganda", options: [""] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: Date.now(), type: "Pilihan ganda", options: [""] }]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <Card sx={{ width: "100%", margin: "auto", mt: 2, borderRadius: 2, p: 5 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {questions.map((question) => (
          <ExamQuestionItem
            key={question.id}
            questionData={question}
            onDelete={() => handleDeleteQuestion(question.id)}
          />
        ))}

        {/* Button Tambah Soal */}
        <Grid container justifyContent="center" mt={2}>
          <IconButton onClick={handleAddQuestion}>
            <AddIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </Card>
  );
}