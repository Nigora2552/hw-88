import {Box, Grid} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../features/users/usersSelectore.ts";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";

const NavBar = () => {
    const user = useAppSelector(selectUser);


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{mb: 2}}>
                <Toolbar>
                    <Grid container justifyContent='space-between' alignItems='center' sx={{width: '100%'}}>
                        <Typography component={NavLink} to='/'
                                    sx={{flexGrow: 1, textDecoration: 'none', color: 'white'}}>
                            News
                        </Typography>
                        <Grid>
                            {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;