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
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo / Nombre */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
        >
          MiTiendaDePlayeras
        </Typography>

        {/* Menú principal */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/disena"
            sx={{ "&:hover": { color: "secondary.main" } }}
          >
            Diseña
          </Button>

          <Button color="inherit" component={RouterLink} to="/catalogo">
            Catálogo
          </Button>
          <Button color="inherit" component={RouterLink} to="/sobre-nosotros">
            Nosotros
          </Button>
          <Button color="inherit" component={RouterLink} to="/como-funciona">
            Guía
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
          <MenuItem
            component={RouterLink}
            to="/contacto"
            onClick={handleCloseMenu}
          >
            Contacto
          </MenuItem>
        </Menu>

        {/* Íconos laterales */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Mi cuenta">
            <IconButton color="inherit" component={RouterLink} to="/cuenta">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Carrito">
            <IconButton color="inherit" component={RouterLink} to="/carrito">
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
