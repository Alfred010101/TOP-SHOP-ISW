import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo / Nombre */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/home"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
        >
          TOP-SHOP
        </Typography>

        {/* Menú principal */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/home">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/catalogo">
            Catálogo
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/design"
            sx={{ "&:hover": { color: "secondary.main" } }}
          >
            Diseña
          </Button>
          <Button color="inherit" component={RouterLink} to="/como-funciona">
            Guía
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            Nosotros
          </Button>
          <Button color="inherit" onClick={handleOpenMenu}>
            Más <MoreVertIcon fontSize="small" />
          </Button>
        </Box>

        {/* Menú desplegable secundario */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem
            component={RouterLink}
            to="/opiniones"
            onClick={handleCloseMenu}
          >
            Opiniones
          </MenuItem>
          <MenuItem component={RouterLink} to="/faq" onClick={handleCloseMenu}>
            FAQ
          </MenuItem>
        </Menu>

        {/* Íconos laterales */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Carrito">
            <IconButton color="inherit" component={RouterLink} to="/carrito">
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mi cuenta">
            <IconButton color="inherit" onClick={handleOpenUserMenu}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Menú desplegable de cuenta */}
        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            component={RouterLink}
            to="/account"
            onClick={handleCloseUserMenu}
          >
            Mi perfil
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/historial-compras"
            onClick={handleCloseUserMenu}
          >
            Historial de compras
          </MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
