import { VideoUploader } from "../components/VideoUploader"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
export const Main = (props) => {
    return (
        <Grid container style={{ background: "rgb(170,126,169)", borderRadius: 15, padding: 15 }} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h4" align="center" fontWeight='bold'>
                    App de emociones
                </Typography>
            </Grid>

            <Grid item sx={{
                backgroundColor: 'rgb(251, 214, 164)',
                color: 'white',
                padding: 3,
                borderRadius: 2,
                boxShadow: 2,
            }}>
                <VideoUploader></VideoUploader>
            </Grid>

        </Grid>
    );
}