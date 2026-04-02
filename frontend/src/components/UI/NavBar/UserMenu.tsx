import {Button} from "@mui/material";
import type {User} from "../../../types";
import {useState} from "react";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/users/usersThunks.ts";
import {NavLink} from "react-router-dom";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch()
    const [_anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    };


    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
            >
                Hello, {user.username}!
            </Button>
            <NavLink style={{color: 'white'}} to='/addPost'>Add new post</NavLink>
            <span style={{margin: '0 10px'}}>or</span>
            <Button
            >
                <span onClick={handleLogout} style={{color: 'white'}}>Logout</span>
            </Button>
        </>
    );
};

export default UserMenu;