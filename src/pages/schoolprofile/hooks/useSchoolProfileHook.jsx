import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import { asyncUpdateSchool } from "../../../states/school/action.js";

export function useSchoolProfileHook() {
  const { showLoading, hideLoading } = useLoading();
  const [authUser, setAuthUser] = useState([]);
  const dispatch = useDispatch()

  const { showModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [schoolName, setSchoolName] = useState('')
  const [jenjang, setJenjang] = useState('')
  const [nss, setNss] = useState('')
  const [npsn, setNpsn] = useState('')
  const [principal, setPrincipal] = useState('')
  const [nipPrincipal, setNipPrincipal] = useState('')
  const [vicePincipal, setVicePincipal] = useState('')
  const [nipVicePrincipal, setNipVicePrincipal] = useState('')
  const [telp, setTelp] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [logo, setLogo] = useState({ preview: '', file: null });
  const [banner, setBanner] = useState({ preview: '', file: null });

  const [schoolCode, setSchoolCode] = useState();
  const schoolData = useSelector((state) => state.school.schoolInfo)

  const handleEdit = ({ isCancel = false }) => {
    setIsEdit((prev) => !prev);

    if (isCancel) {
      setSchoolName(schoolData.school_name || '');
      setJenjang(schoolData.level_of_education || '');
      setNss(schoolData.nss || '');
      setNpsn(schoolData.npsn || '');
      setTelp(schoolData.phone || '');
      setEmail(schoolData.email || '');
      setAddress(schoolData.address || '');

      setLogo({
        preview: `${schoolData.logo || ''}`,
        file: null
      });


      setBanner({
        preview: `${schoolData.banner || ''}`,
        file: null
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const base64Logo = logo.file ? await fileToBase64(logo.file) : schoolData.logo;
      const base64Banner = banner.file ? await fileToBase64(banner.file) : schoolData.banner;
      const payload = {
        // school code buat async func ulang receive data school nya lagi
        schoolCode,
        school_name: schoolName,
        level_of_education: jenjang,
        nss,
        npsn,
        phone: telp,
        email,
        address,
        logo: base64Logo || '',
        banner: base64Banner || '',
      };

      const result = await dispatch(asyncUpdateSchool(payload));
      const { message, status } = result
      showModal(message, status);
    } catch (err) {
      console.error(err);
      showModal(err.message, err.status);
    } finally {
      setIsSubmitting(false);
    }

  };

  const handleReset = () => {
    setSchoolName(schoolData?.school_name || '');
    setJenjang(schoolData?.level_of_education || '');
    setNss(schoolData?.nss || '');
    setNpsn(schoolData?.npsn || '');
    setTelp(schoolData?.phone || '');
    setEmail(schoolData?.email || '');
    setAddress(schoolData?.address || '');
    setLogo({
      preview: schoolData?.logo || '',
      file: null,
    });
    setBanner({
      preview: schoolData?.banner || '',
      file: null,
    });

  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const field = event.target.name;

    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);

      if (field === 'logo') {
        setLogo({ preview: fileURL, file: selectedFile });
      } else if (field === 'banner') {
        setBanner({ preview: fileURL, file: selectedFile });
      }
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return {
    dispatch,
    authUser, setAuthUser,
    schoolCode, setSchoolCode,
    schoolData,
    schoolName, setSchoolName,
    jenjang, setJenjang,
    nss, setNss,
    npsn, setNpsn,
    principal, setPrincipal,
    vicePincipal, setVicePincipal,
    nipPrincipal, setNipPrincipal,
    nipVicePrincipal, setNipVicePrincipal,
    telp, setTelp,
    email, setEmail,
    address, setAddress,
    logo, setLogo,
    banner, setBanner,

    showLoading, hideLoading,
    isSubmitting, setIsSubmitting,
    isEdit, setIsEdit,
    handleEdit,
    handleFileChange,
    handleSubmit,
    handleReset,
  }

}