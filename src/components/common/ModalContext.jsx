import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // success, error, warning
  const [onConfirm, setOnConfirm] = useState(null);

  const showModal = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const showConfirm = (message, callback) => {
    setMessage(message);
    setType("confirm");
    setOnConfirm(() => callback);
    setOpen(true);
  };

  const hideModal = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ open, message, type, showModal, hideModal, showConfirm, onConfirm }}>
      {children}
    </ModalContext.Provider>
  );
};
