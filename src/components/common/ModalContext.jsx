import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false); //state untuk ModalPopUp
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // success, error, warning | state untuk ModalPopUp
  const [onConfirm, setOnConfirm] = useState(null);
  const [confirmText, setConfirmText] = useState('Ya, Hapus')

  const showModal = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const showConfirm = (message, callback, confirmText = 'Ya, Hapus') => {
    setMessage(message);
    setType("confirm");
    setOnConfirm(() => callback);
    setOpen(true);
    setConfirmText(confirmText)
  };

  const hideModal = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ open, message, type, showModal, hideModal, showConfirm, onConfirm, confirmText }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node,
}