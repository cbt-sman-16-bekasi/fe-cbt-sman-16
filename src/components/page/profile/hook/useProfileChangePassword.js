import {useEffect, useState} from "react";
import {useLoading} from "../../../common/LoadingProvider.jsx";
import useApi from "../../../../utils/rest/api.js";
import {useModal} from "../../../common/ModalContext.jsx";

export function useProfileChangePassword({hideModalChangePassword = () => {}}) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    const { showLoading, hideLoading } = useLoading();
    const { showModal } = useModal()

    useEffect(() => {
        if (confirmPassword && newPassword !== confirmPassword) {
            setPasswordMatchError("Password tidak cocok");
        } else if (newPassword && !strongPasswordRegex.test(newPassword)) {
            setPasswordMatchError("Password harus mengandung huruf besar, angka, dan karakter khusus");
        } else if (confirmPassword && !strongPasswordRegex.test(confirmPassword)) {
            setPasswordMatchError("Password harus mengandung huruf besar, angka, dan karakter khusus");
        } else {
            setPasswordMatchError("");
        }
    }, [newPassword, confirmPassword]);

    const handleSaveChanges = async () => {
        showLoading()
        const {message, status} = await useApi.createOrModify({
            url: '/auth/change-password',
            method: 'POST',
            body: {
                new_password: newPassword,
                current_password: currentPassword,
            }
        })
        hideLoading();
        hideModalChangePassword();
        showModal(message, status);
    }


    return {
        currentPassword, setCurrentPassword,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        showPassword, setShowPassword,
        passwordMatchError, setPasswordMatchError,
        handleSaveChanges
    }
}