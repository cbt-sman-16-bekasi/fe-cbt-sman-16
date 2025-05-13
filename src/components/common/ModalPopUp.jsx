import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useModal } from "./ModalContext";
import { CheckCircleIcon, MessageCircleWarningIcon } from "lucide-react";
import ErrorIcon from "@mui/icons-material/Error";

export default function ModalPopUp() {
  const { open, message, type, hideModal, onConfirm, confirmText } = useModal();

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon style={{ color: "green", fontSize: 40 }} size={40} />;
      case "error":
        return <ErrorIcon style={{ color: "red" }} />;
      case "warning":
        return <MessageCircleWarningIcon style={{ color: "orange" }} />;
      case "confirm":
        return <MessageCircleWarningIcon style={{ color: "#facc15", fontSize: 40 }} />;
      default:
        return <CheckCircleIcon style={{ color: "green", fontSize: 40 }} />;
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    hideModal();
  };

  if (type === "changePassword") return null;
  if (type === "memberClass") return null;

  return (
    <Dialog open={open} onClose={hideModal} fullWidth={true} maxWidth='xs'>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
        {getIcon()} {type === "success" ? "Success" : type === "error" ? "Error" : "Warning"}
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <p>{message}</p>
      </DialogContent>
      {type === "confirm" && (
        <DialogActions sx={{ justifyContent: 'end', mb: 2 }}>
          <Button onClick={hideModal} color="inherit">Batal</Button>
          <Button onClick={handleConfirm} color="error" variant="contained">{confirmText}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
