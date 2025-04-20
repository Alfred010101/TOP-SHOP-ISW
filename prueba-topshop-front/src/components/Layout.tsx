// src/components/Layout.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MiTiendaDePlayeras
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Inicio
            </Button>
            <Button color="inherit" component={Link} to="/disena">
              Diseña
            </Button>
            <Button color="inherit" component={Link} to="/catalogo">
              Catálogo
            </Button>
            <Button color="inherit" component={Link} to="/nosotros">
              Nosotros
            </Button>
            <Button color="inherit" component={Link} to="/como-funciona">
              Cómo funciona
            </Button>
            <Button color="inherit" component={Link} to="/opiniones">
              Opiniones
            </Button>
            <Button color="inherit" component={Link} to="/cuenta">
              Cuenta
            </Button>
            <Button color="inherit" component={Link} to="/carrito">
              Carrito
            </Button>
            <Button color="inherit" component={Link} to="/contacto">
              Contacto
            </Button>
            <Button color="inherit" component={Link} to="/faq">
              FAQ
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default Layout;
