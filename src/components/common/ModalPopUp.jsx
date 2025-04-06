import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useModal } from "./ModalContext";
import {CheckCircleIcon, MessageCircleWarningIcon} from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";

export default function ModalPopUp() {
  const { open, message, type, hideModal } = useModal();

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon style={{ color: "green", fontSize: 40 }} size={40}  />;
      case "error":
        return <ErrorIcon style={{ color: "red" }} />;
      case "warning":
        return <MessageCircleWarningIcon style={{ color: "orange" }} />;
      default:
        return <CheckCircleIcon style={{ color: "green", fontSize: 40 }} />;
    }
  };

  return (
    <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth='xs'>
      <DialogTitle sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1}}>
        {getIcon()} {type === "success" ? "Success" : type === "error" ? "Error" : "Warning"}
      </DialogTitle>
      <DialogContent sx={{textAlign: 'center'}}>
        <p>{message}</p>
      </DialogContent>
      {/*<DialogActions>*/}
      {/*  <Button onClick={hideModal} color="primary">*/}
      {/*    Close*/}
      {/*  </Button>*/}
      {/*</DialogActions>*/}
    </Dialog>
  );
}
