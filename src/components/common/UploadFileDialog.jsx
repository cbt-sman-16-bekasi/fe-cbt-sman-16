import { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";
import {UploadFile} from "@mui/icons-material";

export default function UploadFileDialog({
                                           open,
                                           onClose,
                                           onUpload,
                                           title = "Upload File",
                                           subTitle,
                                           accept = ".xlsx,.xls,.csv",
                                         }) {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    onClose();
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {subTitle && (
          <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
            {subTitle}
          </Typography>
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
          sx={{
            mt: 2,
            border: "2px dashed #aaa",
            borderRadius: "10px",
            padding: 5,
            cursor: "pointer",
            transition: "border-color 0.3s",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
          onClick={handleBoxClick}
        >
          <UploadFile sx={{ fontSize: 40, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            Klik atau seret file ke sini untuk mengunggah
          </Typography>
          <input
            type="file"
            accept={accept}
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          {selectedFile && (
            <Typography variant="caption" sx={{ mt: 1 }} color="text.secondary">
              {selectedFile.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Batal</Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          color="cbtPrimary"
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}