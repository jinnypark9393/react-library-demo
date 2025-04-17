import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { text: '홈', path: '/' },
    { text: '나의 책', path: '/my-books' },
    { text: '로그인', path: '/login' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }} role="presentation">
      <h6 style={{ margin: '16px 0', color: '#1B3B36', fontSize: '1.25rem', fontWeight: 500 }}>
        메뉴
      </h6>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} sx={{ color: '#1B3B36' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 1, color: '#1B3B36', textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              코딩알려주는 누나 도서관
            </RouterLink>
          </div>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{ color: '#1B3B36', ml: 2 }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' }, color: '#1B3B36' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;