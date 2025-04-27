import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false); //state untuk ModalPopUp
  const [modalMemberClassOpen, setModalMemberClassOpen] = useState(false); // state khusus buat modalMember
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success"); // success, error, warning | state untuk ModalPopUp
  const [modalMemberType, setModalMemberType] = useState("memberClass"); // state khusus buat modalMember
  const [onConfirm, setOnConfirm] = useState(null);
  const [classId, setClassId] = useState()

  const showModalMemberClass = (id, type = "memberClass") => {
    setModalMemberType(type);
    setModalMemberClassOpen(true)
    setClassId(id)
  };

  const showModalChangePassword = (type = "changePassword") => {
    setType(type);
    setOpen(true)
  };

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
  const hideModalMemberClass = () => setModalMemberClassOpen(false);

  return (
    <ModalContext.Provider value={{ open, modalMemberClassOpen, message, type, modalMemberType, classId, showModalMemberClass, showModalChangePassword, showModal, hideModal, hideModalMemberClass, showConfirm, onConfirm }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node,
}