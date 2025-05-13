import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import useApi from "../../../utils/rest/api.js";
import { setAuthUserActionCreator } from "../../../states/authUser/action.js";

export function useUserProfileHook() {
  const { showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const dispatch = useDispatch()
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
  const [modalPassword, setModalPassword] = useState(false);

  const defaultProfileImg = "/default-user.png";
  const [photoProfile, setPhotoProfile] = useState({
    preview: authUser?.detail?.profile_url
      ? authUser?.detail?.profile_url
      : defaultProfileImg,
    file: null,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const handleEdit = ({ isCancel = false }) => {
    setIsEdit((prev) => !prev);

    if (isCancel) {
      setName(authUser?.detail.name || '');
      setNuptk(authUser?.detail.nuptk || '');
      setPhotoProfile({
        preview: authUser?.detail?.profile_url
          ? authUser?.detail?.profile_url
          : defaultProfileImg,
        file: null,
      });
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // baca file sebagai DataURL (Base64)
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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

  const upload = async (base64) => {
    const { data: logoData } = await useApi.fetch('/upload/base64', {
      method: 'POST',
      body: JSON.stringify({ file_data: base64 })
    })
    return logoData.url
  }

  const handleUpdate = async () => {
    showLoading();

    try {
      let url = authUser?.detail?.profile_url;

      if (photoProfile.file) {
        const base64 = await toBase64(photoProfile.file);
        const uploaded = await upload(base64);
        url = uploaded;
      }

      const response = await useApi.createOrModify({
        url: '/auth/change-profile',
        method: 'POST',
        body: {
          full_name: name,
          username: username,
          profile_url: url
        }
      });

      const { message, status } = response;
      showModal(message, status);

      const updatedUser = {
        ...authUser,
        username,
        detail: {
          ...authUser.detail,
          name,
          profile_url: url,
        },
      };

      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      dispatch(setAuthUserActionCreator(updatedUser));

      setPhotoProfile({
        preview: url || defaultProfileImg,
        file: null,
      });

      setIsEdit(false);
    } catch (err) {
      console.error(err);
      showModal(err.message, err.status);
    } finally {
      hideLoading();
    }
  };


  const handleRemovePhoto = async () => {
    showLoading();

    try {
      const url = "";
      const response = await useApi.createOrModify({
        url: '/auth/change-profile',
        method: 'POST',
        body: {
          full_name: name,
          username: username,
          profile_url: url,
        }
      });

      const { message, status } = response;
      showModal(message, status);

      const updatedUser = {
        ...authUser,
        username,
        detail: {
          ...authUser.detail,
          name,
          profile_url: "",
        }
      };

      setPhotoProfile({
        preview: defaultProfileImg,
        file: null
      });

      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      dispatch(setAuthUserActionCreator(updatedUser));
      setIsEdit(false);
    } catch (err) {
      console.error(err);
      showModal(err.message, err.status);
    } finally {
      hideLoading();
    }
  };


  const onChangePasswordModal = () => {
    setModalPassword(!modalPassword)
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
    isTeacher, setIsTeacher,
    handleEdit,
    handleFileChange,
    handleUpdate,
    onChangePasswordModal,
    modalPassword,
    handleRemovePhoto,
  }

}