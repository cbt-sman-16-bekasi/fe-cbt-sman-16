import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // success, error, warning

  const showModal = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const hideModal = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ open, message, type, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
