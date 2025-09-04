import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState, type JSX } from 'react';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import { Button } from '@mui/material';
import { useLocalStorageContext } from '../store/localStorageContext';


const settings = ['Profile', 'Logout'];
interface AppBarProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
}

function ResponsiveAppBar({ setOpen, open, setOpenLogin }: Readonly<AppBarProps>): JSX.Element {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { value, setValue } = useLocalStorageContext();
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container sx={{ mx: '0px !important', px: '0px !important', maxWidth: '100% !important' }}>
                <Toolbar disableGutters>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setOpen(!open)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <DirectionsBoatFilledIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ICEMAN
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} textAlign={'end'}>
                        {!value
                            ? <Button
                                sx={{
                                    mr: 2,
                                    '&:hover': {
                                        backgroundColor: '#074dafff',
                                    }
                                }}
                                color="inherit"
                                onClick={() => setOpenLogin(true)}>
                                Login
                            </Button>
                            : <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, pr: 2 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                        <MenuItem
                                            key={setting}
                                            onClick={() => {
                                                handleCloseUserMenu()
                                                if (setting === 'Logout') {
                                                    setValue("")
                                                }
                                            }}
                                        >
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
