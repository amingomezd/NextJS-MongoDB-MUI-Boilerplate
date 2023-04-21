import React, { useState } from 'react';
import { AppBar, Chip, Divider, IconButton, Menu, MenuItem, Stack, Toolbar, Tooltip } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const AppbarView = ({ pages, userSettings, user, onSignOut }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: 'white', zIndex: 2 }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Chip
            label='Awesome Site name'
            variant='outlined'
            component={Link}
            href='/'
            sx={{ display: { xs: 'none', md: 'flex' } }}
          />

          {/* Mobile Hamburger Menu*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' onClick={handleOpenNavMenu} color='primary'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {user ? (
                <>
                  <MenuItem>
                    <Typography textAlign='center'>Athenticated page 1</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign='center'>Athenticated page 2</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} href={pages.login.url}>
                    <Typography textAlign='center'>{pages.login.name}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} href={pages.signUp.url}>
                    <Typography textAlign='center'>{pages.signUp.name}</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Chip
            label='Awesome Site name'
            variant='outlined'
            component={Link}
            href='/'
            sx={{ display: { xs: 'flex', md: 'none' } }}
          />

          {/* User menu OR Desktop Buttons*/}
          {user ? (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={user.profilePicture} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu} component={Link} href={setting.url}>
                    <Typography textAlign='center'>{setting.name}</Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={onSignOut}>
                  <Typography textAlign='center'>Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Stack
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}
              direction='row'
              spacing={2}
            >
              <Link href={pages.login.url} passHref>
                <Button variant='outlined' onClick={handleCloseNavMenu}>
                  {pages.login.name}
                </Button>
              </Link>
              <Link href={pages.signUp.url} passHref>
                <Button variant='contained' onClick={handleCloseNavMenu}>
                  {pages.signUp.name}
                </Button>
              </Link>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppbarView;
