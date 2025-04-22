import { useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useTeacherApi from "../../../utils/rest/teacher.js";

export function useUserProfileHook() {
  const { showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const authUser = useSelector((state) => state.authUser || localStorage.getItem('authUser'));

  const [name, setName] = useState('')
  const [nuptk, setNuptk] = useState('')
  const [userRole, setUserRole] = useState(authUser?.role);
  const [username, setUsername,] = useState(authUser?.username);

  const [formPassword, setFormPassword] = useState({ current: '', newPass: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const isPasswordBeingChanged = formPassword.newPass !== '' || formPassword.confirm !== '';
  const isPasswordValid = !isPasswordBeingChanged || (formPassword.newPass === formPassword.confirm);

  const defaultProfileImg = "/default-user.png";
  const [photoProfile, setPhotoProfile] = useState({
    preview: authUser?.logo
      ? `data:${authUser?.logo};base64,${authUser?.logo}`
      : defaultProfileImg,
    file: null,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = ({ isCancel = false }) => {
    setIsEdit((prev) => !prev);

    if (isCancel) {
      setName(authUser?.detail.name || '');
      setNuptk(authUser?.nuptk || '');
      setPhotoProfile({
        preview: authUser?.logo
          ? `data:${authUser?.logo};base64,${authUser?.logo}` : defaultProfileImg,
        file: null
      });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const field = event.target.name;

    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);

      if (field === 'logo') {
        setPhotoProfile({ preview: fileURL, file: selectedFile });
      }
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    showLoading()

    const body = {
      name,
      nuptk,
      role: userRole,
      username,
      ...(formPassword.newPass && formPassword.confirm && formPassword.newPass === formPassword.confirm
        ? { password: formPassword.newPass }
        : {})
    };

    try {
      const response = await useTeacherApi.modifyTeacher({ body, id: authUser?.ID });
      const { message, status } = response
      showModal(message, status);

      setFormPassword({ current: '', newPass: '', confirm: '' });
    } catch (err) {
      console.error(err);
      showModal(err.message, err.status);
    } finally {
      hideLoading()
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const onOpenPasswordModal = () => {
    showModal("", "changePassword");
  };

  return {
    authUser,
    name, setName,
    nuptk, setNuptk,
    userRole, setUserRole,
    username, setUsername,
    photoProfile, setPhotoProfile,
    formPassword, setFormPassword,
    showPassword, setShowPassword,
    passwordMatchError, setPasswordMatchError,
    isPasswordValid,

    showAlert, setShowAlert,
    alertMessage, setAlertMessage,
    alertSeverity, setAlertSeverity,
    isSubmitting, setIsSubmitting,
    isEdit, setIsEdit,
    handleEdit,
    handleFileChange,
    handleUpdate,
    onOpenPasswordModal,
  }

}