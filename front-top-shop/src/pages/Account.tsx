import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <h1>Account</h1>
      <div style={{ padding: "2rem" }}>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </>
  );
};

export default Account;
