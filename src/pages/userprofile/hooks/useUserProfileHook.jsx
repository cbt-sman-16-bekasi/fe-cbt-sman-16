import { useState } from "react";
import { useSelector } from "react-redux";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
// import { IconButton } from "@mui/material";
// import { asyncUpdateSchool } from "../../../states/school/action.js";
import useTeacherApi from "../../../utils/rest/teacher.js";

export function useUserProfileHook() {
  // const [photoProfile, setPhotoProfile] = useState({ preview: '', file: null });
  // const dispatch = useDispatch()

  const { showConfirm, showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const authUser = useSelector((state) => state.authUser || localStorage.getItem('authUser'));

  const [name, setName] = useState('')
  const [nuptk, setNuptk] = useState('')
  const [userRole, setUserRole] = useState(authUser?.role);
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

  // const handleSubmit = async () => {
  //   setIsSubmitting(true);

  //   try {
  //     const base64PhotoProfile = logo.file ? await fileToBase64(logo.file) : schoolData.logo;
  //     const payload = {
  //       // school code buat async func ulang receive data school nya lagi
  //       schoolCode,
  //       school_name: schoolName,
  //       level_of_education: jenjang,
  //       nss,
  //       npsn,
  //       phone: telp,
  //       email,
  //       address,
  //       logo: base64PhotoProfile || '',
  //       banner: base64Banner || '',
  //     };

  //     const result = await dispatch(asyncUpdateSchool(payload));
  //     setAlertSeverity('success');
  //     setAlertMessage('Berhasil menyimpan data sekolah');

  //     setShowAlert(true);
  //   } catch (err) {
  //     console.error(err);
  //     alert('error', err.message || `Terjadi kesalahan saat parsing file.`);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  //   setTimeout(() => {
  //     setShowAlert(false);
  //   }, 5000);
  // };


  // const fileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     if (!file) return resolve(null);
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const base64 = reader.result;
  //       resolve(base64);
  //     };
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  const messageDelete = () => {
    return (
      <div>
        <p style={{ marginTop: 8, textAlign: 'center' }}>
          Apakah kamu yakin ingin melanjutkan proses hapus <strong>Mata Pelajaran</strong> ini?
        </p>
      </div>
    )
  }

  // const base64PhotoProfile = photoProfile.file ? await fileToBase64(photoProfile.file) : authUser.logo;

  const handleUpdate = async () => {
    setIsSubmitting(true);

    const body = {
      name,
      nuptk,
      role: userRole,
      username: authUser?.username,
      ...(formPassword.newPass && formPassword.confirm && formPassword.newPass === formPassword.confirm
        ? { password: formPassword.newPass }
        : {})
    };

    try {
      showConfirm(messageDelete(), async () => {
        showLoading();
        await useTeacherApi.modifyTeacher({ body, id: authUser?.id });
        hideLoading();
      });

      setAlertSeverity('success');
      setAlertMessage('Berhasil menyimpan data.');
      setShowAlert(true);

      // Reset password form kalau sukses
      setFormPassword({ current: '', newPass: '', confirm: '' });
    } catch (err) {
      console.error(err);
      alert('error', err.message || `Terjadi kesalahan saat menyimpan data.`);
    } finally {
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
    // handleSubmit,
    handleEdit,
    handleFileChange,
    handleUpdate,
    onOpenPasswordModal,
  }

}