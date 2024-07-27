'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import KofiButton from 'kofi-button';
import CustomMenuItem from './menuItem';
import Link from 'next/link';


export default function MainNav() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const siteName = "MPT";
    return (
        <AppBar position="static" className='z-50 border-solid border-b-4 border-slate-800 bg-slate-300 text-slate-800 sticky top-0' sx={{ bgcolor: "rgb(203 213 225)", color: "rgb(30 41 59)" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/">
                            {siteName}
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <CustomMenuItem handleCloseNavMenu={handleCloseNavMenu} name="available agencies" url="/agencies" />
                            <CustomMenuItem handleCloseNavMenu={handleCloseNavMenu} name={"about me"} url={"https://github.com/djmeier-wisc"} />
                            <CustomMenuItem handleCloseNavMenu={handleCloseNavMenu} name={"api reference"} url={"https://api.my-precious-time.com/webjars/swagger-ui/index.html"} />
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/">
                            {siteName}
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <CustomMenuItem handleCloseNavMenu={handleCloseNavMenu} name="available agencies" url="/agencies" />
                        <CustomMenuItem handleCloseNavMenu={handleCloseNavMenu} name="about me" url="https://github.com/djmeier-wisc" />
                        <CustomMenuItem handleCloseNavMenu={handleCloseNavMenu} name="api reference" url="https://api.my-precious-time.com/webjars/swagger-ui/index.html" />
                    </Box>
                    <KofiButton color='#1e293b' title='Help Fund the Project' kofiID='doug_meier' />
                </Toolbar>
            </Container>
        </AppBar>
    );
}