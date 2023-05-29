
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright - MIT License - Andraž Čeh'}
        </Typography>
    );
}




export const Footer = () => {

    return <>

            <Copyright sx={{ mt: 5 }} />
      
    </>
}