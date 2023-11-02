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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const pages = ['ABOUTUS', 'SERVICES', 'CONTACTUS', 'LOGIN']; // Change tab labels

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElServices, setAnchorElServices] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenServicesMenu = (event) => {
    setAnchorElServices(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseServicesMenu = (event, section) => {
    event.preventDefault(); // Prevent the default link behavior
    setAnchorElServices(null); // Close the dropdown
    scrollToSection(section); // Scroll to the selected section
  };

  const scrollToSection = (section) => {
    const targetElement = document.getElementById(section);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <AppBar position="static" sx={{ height: '64px' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
              <img
                src="/images/adeptpros.png" // Replace with the actual path to your image
                alt="Logo"
                width="300" // Set a fixed width and height
                height="50"
                style={{
                 
                  objectFit: 'cover', // Add this to make the image fit within the fixed size
                }}
              />
            </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            Logo
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Button
              component={Link}
              to="/SERVICES"
              sx={{
                my: 2,
                mx: 2,
                color: 'white',
              }}
              onClick={handleOpenServicesMenu}
            >
              SERVICES
            </Button>
            <Button
              component={Link}
              to="/ABOUTUS"
              sx={{
                my: 2,
                mx: 2,
                color: 'white',
              }}
            >
              ABOUT US
            </Button>
            <Button
              component={Link}
              to="/CONTACTUS"
              sx={{
                my: 2,
                mx: 2,
                color: 'white',
              }}
            >
              CONTACT US
            </Button>
            <Button
              component={Link}
              to="/LOGIN"
              sx={{
                my: 2,
                mx: 2,
                color: 'white',
              }}
            >
              LOGIN
            </Button>
            <Menu
  anchorEl={anchorElServices}
  keepMounted
  open={Boolean(anchorElServices)}
  onClose={handleCloseServicesMenu}
  sx={{
    marginTop: '45px',
  }}
>
  <MenuItem
    component={Link}
    to="#strategy"
    onClick={(event) => handleCloseServicesMenu(event, 'strategy')}
  >
    Strategy
  </MenuItem>
  <MenuItem
    component={Link}
    to="#design"
    onClick={(event) => handleCloseServicesMenu(event, 'design')}
  >
    Design
  </MenuItem>
  <MenuItem
    component={Link}
    to="#development"
    onClick={(event) => handleCloseServicesMenu(event, 'development')}
  >
    Development
  </MenuItem>
  <MenuItem
    component={Link}
    to="#testing"
    onClick={(event) => handleCloseServicesMenu(event, 'testing')}
  >
    Testing
  </MenuItem>
</Menu>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/images/adeptpros.png" sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                }}
                />
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
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
