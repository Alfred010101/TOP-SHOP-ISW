import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import PerfilForm from "../components/PerfilForm";
import PasswordForm from "../components/PasswordForm";

const PerfilPage = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            top: 60, // espacio para el AppBar
          },
        }}
      >
        <Box sx={{ width: 240 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/account/profile"
                selected={
                  location.pathname === "/account/profile" ||
                  location.pathname === "/account"
                }
              >
                <ListItemText primary="Mi perfil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/account/password"
                selected={location.pathname === "/account/password"}
              >
                <ListItemText primary="Cambiar contraseña" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<PerfilForm />} />
          <Route path="profile" element={<PerfilForm />} />
          <Route path="password" element={<PasswordForm />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default PerfilPage;
