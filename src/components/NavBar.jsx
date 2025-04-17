import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
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

  const darkGreen = '#1B3B36'; // 어두운 초록색 정의

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
      <Typography variant="h6" sx={{ my: 2, color: '#1B3B36' }}>
        메뉴
      </Typography>
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: { xs: 1, md: 0 }, color: '#1B3B36', textAlign: { xs: 'center', md: 'left' } }} // 모바일에서는 중앙 정렬, PC에서는 좌측
          >
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              코딩알려주는 누나 도서관
            </RouterLink>
          </Typography>

          {/* PC: 우측 네비게이션 링크 */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{ color: darkGreen, ml: 2 }} // 링크 간 간격 추가
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* 모바일: 햄버거 버튼 */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" // 햄버거 버튼을 우측 끝으로
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' }, color: darkGreen }} // 모바일에서만 보이도록
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 모바일: Drawer */}
      <Drawer
        anchor="right" // 오른쪽에서 나오도록 설정
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' }, // 모바일에서만 Drawer 사용
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;