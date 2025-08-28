// src/components/Navbar.js
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, TextField, InputAdornment, Menu, MenuItem, Button, Avatar, Divider } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Search as SearchIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const searchParams = new URLSearchParams(window.location.search);
    if (e.target.value) {
      searchParams.set('search', e.target.value);
    } else {
      searchParams.delete('search');
    }
    window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => { logout(); handleMenuClose(); };

  return (
    <AppBar position="static" color="transparent" elevation={1} sx={{ backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: isDarkMode ? '#fff' : '#000' }}>
          <h1 className="text-2xl font-bold">E-Shop</h1>
        </Link>

        <TextField
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: isDarkMode ? '#fff' : '#000' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            marginLeft: '20px',
            flexGrow: 1,
            backgroundColor: isDarkMode ? '#333' : '#fff',
            '& .MuiInputBase-input': { color: isDarkMode ? '#fff' : '#000' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: isDarkMode ? '#555' : '#ccc' },
              '&:hover fieldset': { borderColor: isDarkMode ? '#777' : '#999' },
              '&.Mui-focused fieldset': { borderColor: isDarkMode ? '#90caf9' : '#1976d2' },
            },
          }}
        />

        <IconButton color="inherit" component={Link} to="/cart" sx={{ marginLeft: '20px', color: isDarkMode ? '#fff' : '#000' }}>
          <ShoppingCartIcon />
          {totalQuantity > 0 && <span style={{ marginLeft: 8, color: isDarkMode ? '#fff' : '#000' }}>{totalQuantity}</span>}
        </IconButton>

        {user ? (
          <>
            <Button
              color="inherit"
              onClick={handleMenuClick}
              sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center', color: isDarkMode ? '#fff' : '#000' }}
              startIcon={<Avatar sx={{ width: 28, height: 28 }}>{user.name[0].toUpperCase()}</Avatar>}
            >
              {user.name}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem disabled>
                <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{user.name[0].toUpperCase()}</Avatar>
                {user.name}
              </MenuItem>
              <Divider />
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>Orders</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login" sx={{ marginLeft: '20px', color: isDarkMode ? '#fff' : '#000' }}>
            Login
          </Button>
        )}

        <IconButton color="inherit" onClick={toggleDarkMode} sx={{ marginLeft: '20px', color: isDarkMode ? '#fff' : '#000' }}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
