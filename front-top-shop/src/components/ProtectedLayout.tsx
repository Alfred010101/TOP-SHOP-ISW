import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { Container, CssBaseline } from "@mui/material";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default ProtectedLayout;
