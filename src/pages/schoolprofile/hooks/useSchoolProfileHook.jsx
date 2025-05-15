import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../components/common/ModalContext.jsx";
import { useLoading } from "../../../components/common/LoadingProvider.jsx";
import { asyncUpdateSchool } from "../../../states/school/action.js";
import useApi from "../../../utils/rest/api.js";

export function useSchoolProfileHook() {
  const dispatch = useDispatch()
  const { showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const schoolData = useSelector((state) => state.school.schoolInfo)

  const [authUser, setAuthUser] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const defaultLogo = "/logo-default.png";
  const [logo, setLogo] = useState({ preview: schoolData?.logo ? schoolData?.logo : defaultLogo, file: null });
  const [banner, setBanner] = useState({ preview: '', file: null });
  const [emptyLogo, setEmptyLogo] = useState(false)

  const [schoolCode, setSchoolCode] = useState();

  const handleEdit = ({ isCancel = false }) => {
    setIsEdit((prev) => !prev);

    if (isCancel) {
      setEmptyLogo(false)
      setSchoolName(schoolData?.school_name || '');
      setJenjang(schoolData?.level_of_education || '');
      setNss(schoolData?.nss || '');
      setNpsn(schoolData?.npsn || '');
      setTelp(schoolData?.phone || '');
      setEmail(schoolData?.email || '');
      setAddress(schoolData?.address || '');
      setPrincipal(schoolData?.principal_name || '');
      setVicePincipal(schoolData?.vice_principal_name || '');
      setNipPrincipal(schoolData?.principal_nip || '')
      setNipVicePrincipal(schoolData?.vice_principal_nip || '');

      setLogo({
        preview: schoolData?.logo ? schoolData?.logo : defaultLogo,
        file: null
      });

      setBanner({
        preview: schoolData?.banner,
        file: null
      });
    }
  };

  const upload = async (base64) => {
    const { data: logoData } = await useApi.fetch('/upload/base64', {
      method: 'POST',
      body: JSON.stringify({ file_data: base64 })
    })
    return logoData.url
  }

  const handleRemoveLogo = async () => {
    setLogo({
      preview: defaultLogo,
      file: null
    });
    setEmptyLogo(true)
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      let urlLogo = emptyLogo ? "" : schoolData.logo;

      if (logo.file) {
        const base64 = await fileToBase64(logo.file);
        urlLogo = await upload(base64);
      }

      const base64Banner = banner.file ? await upload(await fileToBase64(banner.file)) : schoolData.banner;

      const payload = {
        schoolCode,
        school_name: schoolName,
        level_of_education: jenjang,
        nss,
        npsn,
        phone: telp,
        email,
        address,
        logo: urlLogo,
        banner: base64Banner || '',
        principal_name: principal,
        principal_nip: nipPrincipal,
        vice_principal_name: vicePincipal,
        vice_principal_nip: nipVicePrincipal
      };

      dispatch(asyncUpdateSchool(payload));
      showModal("Berhasil meperbarui data sekolah", 'success');

      setLogo({
        preview: urlLogo || defaultLogo,
        file: null,
      });

      setIsEdit(false);
    } catch (err) {
      console.error("ERROR HERE", err);
      showModal(err.message, "error");
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
    console.log(field)

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
    handleRemoveLogo,
  }

}