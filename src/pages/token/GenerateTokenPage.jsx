import AlertWithTitle from "../../components/common/AlertWithTitle.jsx";
import {ListSharp, RocketLaunch, TokenOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import BasicCard from "../../components/common/BasicCard.jsx";
import FormGeneratToken from "../../components/page/token/FormGeneratToken.jsx";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import TitleWithIcon from "../../components/common/TitleWithIcon.jsx";
import {useGenerateTokenHook} from "./hook/useGenerateTokenHook.js";
import Grid from "@mui/material/Grid2";
import ApiTable from "../../components/ApiTable.jsx";

const GenerateTokenPage = () => {
  const {
    token, setToken,
    columns
  } = useGenerateTokenHook()
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <AlertWithTitle icon={<RocketLaunch fontSize="small" color="info" />} title="Setting Session Ujian!"
                      message="Silahkan klik Generate Token untuk mendapatkan token yang akan diberikan ke siswa. Masa aktif Token berlaku selama satu hari."
      />

      <TitleWithIcon icon={<TokenOutlined sx={{color: 'white'}} />} text="Generate Token" iconBackground="red" />
      <BasicCard gap="0.3rem" sx={{mb:4}}>
        <Typography variant="body1" fontWeight="bold">
          Token Test
        </Typography>
        <Paper
          elevation={0}
          sx={{
            mt: 1,
            p: 2,
            bgcolor: "#FFFDE7",
            border: "1px solid #FFEB3B",
            borderRadius: 1,
            minHeight: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" fontWeight="bold" color='black'>
            {token}
          </Typography>
        </Paper>
      </BasicCard>

      <FormGeneratToken onChangeGenerate={setToken} />

      <TitleWithIcon icon={<ListSharp sx={{color: 'white'}} />} text="Daftar Token" iconBackground="red" />
      <Grid container spacing={1} columns={12} sx={{
        '--Grid-borderWidth': '1px',
        borderTop: 'var(--Grid-borderWidth) solid',
        borderLeft: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider',
        '& > div': {
          borderRight: 'var(--Grid-borderWidth) solid',
          borderBottom: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
        }
      }}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <ApiTable url="/academic/exam/session/token/all" isPagination={false} columns={columns} isRefresh={token} searchKey="name" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default GenerateTokenPage