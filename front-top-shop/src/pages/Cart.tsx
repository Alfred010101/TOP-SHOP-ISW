import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import ItemsCart from "../components/ItemsCart";
import History from "../components/History";

const Cart = () => {
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
            top: 90, // espacio para el AppBar
          },
        }}
      >
        <Box sx={{ width: 240 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/car/items"
                selected={
                  location.pathname === "/car/items" ||
                  location.pathname === "/car"
                }
              >
                <ListItemText primary="Carrito" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/car/history"
                selected={location.pathname === "/car/history"}
              >
                <ListItemText primary="Historial" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<ItemsCart />} />
          <Route path="items" element={<ItemsCart />} />
          <Route path="history" element={<History />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Cart;
