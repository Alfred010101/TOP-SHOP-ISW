import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BtnLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 3 }}
    >
      Cerrar Sesión
    </Button>
  );
};

export default BtnLogout;
