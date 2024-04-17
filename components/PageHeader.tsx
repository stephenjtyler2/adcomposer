
import React, {useContext} from 'react';
import { Typography, Box, Menu, Avatar, MenuItem, Tooltip, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AuthContext } from './AuthContextProvider';

type Props = {
    title: string,
}

function PageHeader(props: Props) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const {user, userLoggedOut} = useContext(AuthContext);

    const handleMenuItemClick = (setting: string) => () => {
        switch (setting) {
            case 'Logout':
                userLoggedOut();            
                break;
            case 'Dashboard':
                break;
            case 'Account':
                break;
            case 'Profile':
                break;
        }

        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ display: "flex", m: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">
                    {props.title}
                </Typography>
            </Box>
            <Box >
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={(theme) => ({ bgcolor: theme.palette.primary.main })} alt="Stephen Tyler">S</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleMenuItemClick(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

        </Box>
    );
}
export default PageHeader;