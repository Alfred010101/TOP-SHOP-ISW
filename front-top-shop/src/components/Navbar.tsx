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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo Top-shop.jpg"; // Importación correcta del logo

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
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "white", // Color de fondo explícito
        color: "black", // Color de texto principal
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          gap: 2,
          padding: "8px 16px !important",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/home"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            flexShrink: 0,
            "& img": {
              maxWidth: { xs: "70px", md: "70px" }, // Tamaño responsive corregido
              height: "auto",
              objectFit: "contain",
            },
          }}
        >
          <img src={logo} alt="Top-shop logo" />
        </Typography>

        {/* Menú principal */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            alignItems: "center",
            ml: "auto",
            marginRight: 5,
          }}
        >
          <Button
            component={RouterLink}
            to="/home"
            sx={{
              color: "black",
              "&:hover": {
                background: "#9b59b6",
                color: "#bdc3c7",
              },
            }}
          >
            Inicio
          </Button>
          <Button
            component={RouterLink}
            to="/catalogo"
            sx={{
              color: "black",
              "&:hover": {
                background: "#9b59b6",
                color: "#bdc3c7",
              },
            }}
          >
            Catálogo
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            sx={{
              color: "black",
              "&:hover": {
                background: "#9b59b6",
                color: "#bdc3c7",
              },
            }}
          >
            Sobre Nosotros
          </Button>
          <Button
            onClick={handleOpenMenu}
            sx={{
              color: "black",
              "&:hover": {
                background: "#9b59b6",
                color: "#bdc3c7",
              },
            }}
          >
            Más <MoreVertIcon fontSize="small" sx={{ color: "black" }} />
          </Button>
        </Box>

        {/* Menú desplegable secundario */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem
            component={RouterLink}
            to="/regist"
            onClick={handleCloseMenu}
            sx={{
              color: "black",
              "&:hover": {
                background: "#bdc3c7",
              },
            }}
          >
            Registrar
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/faq"
            onClick={handleCloseMenu}
            sx={{
              color: "black",
              "&:hover": {
                background: "#bdc3c7",
              },
            }}
          >
            FAQ
          </MenuItem>
        </Menu>

        {/* Íconos laterales */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Carrito">
            <IconButton
              component={RouterLink}
              to="/car"
              sx={{ color: "black" }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mi cuenta">
            <IconButton onClick={handleOpenUserMenu} sx={{ color: "black" }}>
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
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
