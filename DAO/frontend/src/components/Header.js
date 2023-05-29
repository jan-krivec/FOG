import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';




export const Header = ({ isConnected, account, signer, connectToMetamask }) => {
    return (
        <React.Fragment>
          
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                       User Role Voting DAO
                    </Typography>
                    {!isConnected ? <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={connectToMetamask} >
                        Connect Wallet
                    </Button> : <Button variant='outlined' disabled>Connected</Button>}

                    
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}