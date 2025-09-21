import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid2';
import {
  Card,
  CardContent,
  InputAdornment,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
} from "@mui/material";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import CustomInput from "../../form/FormInputTextField.jsx";
import {LucideBuilding, Lock, User, Key, GraduationCap} from "lucide-react";
import {asyncRetrieveSystemConfigCategorySchool} from "../../../states/system/action.js";

const RegisterForm = ({ login }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [copyright, setCopyright] = useState("-")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const systemConfigSlash = useSelector((state) => state.systemConfig.configSlash);
  const systemConfigCategorySchool = useSelector((state) => state.systemConfig.categorySchool);
  const [categories, setCategories] = useState([])

  const handleLogin = () => {
    login({ password, username });
  };

  useEffect(() => {
    if (systemConfigSlash) {
      const copyrightConfig = systemConfigSlash?.find(s => s.name === "copyright") ?? null;
      setCopyright(copyrightConfig?.value ?? "-")
    }
  }, [systemConfigSlash])

  useEffect(() => {
    if (systemConfigCategorySchool === null || systemConfigCategorySchool === undefined) {
      dispatch(asyncRetrieveSystemConfigCategorySchool())
    }
  }, [dispatch]);

  useEffect(() => {
    if (systemConfigCategorySchool) {
      const categorySchool = systemConfigCategorySchool?.map(
        (category) => {
          return {
            value: category.name,
            label: category.value,
          }
        }
      ) ?? [];
      setCategories(categorySchool ?? [])
    }
  }, [systemConfigCategorySchool])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Card
        sx={{
          p: 2,
          width: 600,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.common.white,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src="/sinau-logo-remove.png" alt="Logo Sekolah" width={300} height={90} />
        </Box>
        <CardContent>
          <Grid container spacing={2} alignItems="center" columns={12} sx={{ padding: 2 }}>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <CustomInput label="Nama Lengkap"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           oneLineInput fullWidth propsLabel={{
                variant: "subtitle2",
              }}
                           inputProps={{
                             startAdornment: (
                               <InputAdornment position="start">
                                 <User />
                               </InputAdornment>
                             ),
                           }}
              />
            </Grid>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <CustomInput label="Nama Pengguna"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           oneLineInput fullWidth propsLabel={{
                            variant: "subtitle2",
                          }}
                           inputProps={{
                             startAdornment: (
                               <InputAdornment position="start">
                                 <Key />
                               </InputAdornment>
                             ),
                           }}
              />
            </Grid>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <CustomInput label="Jenjang"
                           options={categories}
                           oneLineInput fullWidth propsLabel={{
                            variant: "subtitle2",
                          }}
                           inputProps={{
                             startAdornment: (
                               <InputAdornment position="start">
                                 <GraduationCap />
                               </InputAdornment>
                             ),
                           }}
              />
            </Grid>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <CustomInput label="Nama Sekolah"
                           oneLineInput fullWidth propsLabel={{
                variant: "subtitle2",
              }}
                           inputProps={{
                             startAdornment: (
                               <InputAdornment position="start">
                                 <LucideBuilding />
                               </InputAdornment>
                             ),
                           }}
              />
            </Grid>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <CustomInput label="Password"
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           oneLineInput fullWidth
                           propsLabel={{
                              variant: "subtitle2",
                            }}
                           inputProps={{
                             startAdornment: (
                               <InputAdornment position="start">
                                 <Lock />
                               </InputAdornment>
                             ),
                           }}
              />
            </Grid>

            <Grid size={{ sm: 12 }} sx={{ width: '100%' }}>
              <CustomInput label="Konfirmasi Password"
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           oneLineInput fullWidth
                           propsLabel={{
                             variant: "subtitle2",
                           }}
                           inputProps={{
                             startAdornment: (
                               <InputAdornment position="start">
                                 <Lock />
                               </InputAdornment>
                             ),
                           }}
              />
            </Grid>

            <Grid size={{ sm: 12 }}>
              <FormControlLabel
                control={<Checkbox onChange={() => setShowPassword(!showPassword)} />}
                label="Tampilkan Password"
                sx={{
                  textAlign: "left",
                  width: "100%",
                  color: (theme) => theme.palette.text.primary,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                }}
              />
            </Grid>
            <Grid size={{ sm: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.4rem'}}>
              <Button
                onClick={handleLogin}
                fullWidth variant="contained" color="info"
                sx={{
                  mt: 2,
                }}
              >
                Daftar
              </Button>

              <Typography variant="body2" sx={{ mt: 2, fontSize: 12 }}>
                Sudah punya akun?
              </Typography>
              <Button
                onClick={() => navigate("/login")}
                fullWidth variant="outlined" color="secondary"
              >
                Masuk
              </Button>
            </Grid>
          </Grid>

        </CardContent>

      </Card>
      <Typography variant="body2" sx={{ mt: 2, fontSize: 12 }}>
        {copyright}
      </Typography>
    </Container>

  );
};

export default RegisterForm;

RegisterForm.propTypes = {
  login: PropTypes.func.isRequired,
};