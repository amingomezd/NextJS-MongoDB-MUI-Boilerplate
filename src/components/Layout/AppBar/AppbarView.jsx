import React, { useState } from 'react';
import {
  AppBar,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  useTheme
} from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useIsDesktop } from '@/src/hooks/useGetLayouts';

const AppbarView = ({ authLinks, userSettings, authenticatedLinks, user, onSignOut }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isDesktop = useIsDesktop();
  const muiTheme = useTheme();

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

  const hamburgerMenu = (
    <>
      <IconButton size='large' onClick={handleOpenNavMenu} color='primary'>
        <MenuIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {user
          ? authenticatedLinks.map((page) => (
              <MenuItem key={page.name} component={Link} href={page.url}>
                <Typography textAlign='center'>{page.name}</Typography>
              </MenuItem>
            ))
          : authLinks.map((page) => (
              <MenuItem key={page.name} component={Link} href={page.url} onClick={handleCloseNavMenu}>
                <Typography textAlign='center'>{page.name}</Typography>
              </MenuItem>
            ))}
      </Menu>
    </>
  );

  const logo = (
    <Chip
      label='Awesome Site name'
      variant='outlined'
      component={Link}
      href='/'
      color='primary'
      sx={{ fontSize: '20px' }}
    />
  );

  const userAvatarMenu = (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={user?.profilePicture} />
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
  );

  const desktopView = (
    <Grid container spacing={1} alignItems='center'>
      <Grid item xs={3}>
        {logo}
      </Grid>
      <Grid item xs={user ? 8 : 9}>
        <Stack justifyContent='flex-end' direction='row' spacing={1}>
          {user
            ? authenticatedLinks.map((page) => (
                <Link href={page.url} passHref key={page.name}>
                  <Button variant='text'>
                    <Typography textAlign='center'>{page.name}</Typography>
                  </Button>
                </Link>
              ))
            : authLinks.map((page) => (
                <Link href={page.url} passHref key={page.name}>
                  <Button variant={page.variant} onClick={handleCloseNavMenu}>
                    {page.name}
                  </Button>
                </Link>
              ))}
        </Stack>
      </Grid>
      {user && (
        <Grid item xs={1}>
          {userAvatarMenu}
        </Grid>
      )}
    </Grid>
  );

  const mobileView = (
    <Grid container spacing={1} alignItems='center'>
      <Grid item xs={1}>
        {hamburgerMenu}
      </Grid>
      <Grid item xs={10} textAlign='center'>
        {logo}
      </Grid>
      <Grid item xs={1}>
        {user && userAvatarMenu}
      </Grid>
    </Grid>
  );

  return (
    <AppBar position='static' sx={{ backgroundColor: muiTheme.palette.background.paper, zIndex: 2 }}>
      <Container>
        <Toolbar disableGutters>{isDesktop ? desktopView : mobileView}</Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppbarView;
