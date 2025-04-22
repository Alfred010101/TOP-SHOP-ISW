import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignInForm: React.FC = () => {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Introduzca sus credenciales.");
    } else {
      const success = await login(username, password);
      if (success) {
        navigate("/home");
      }
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="title">Iniciar sesión</h2>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Iniciar sesión" className="btn solid" />
    </form>
  );
};

export default SignInForm;
