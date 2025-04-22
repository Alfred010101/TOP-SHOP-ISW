import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Asegúrate que esté bien la ruta

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2 className="title">Crear cuenta nueva</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Nombre(s)"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Apellidos"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-phone"></i>
        <input
          type="text"
          placeholder="Telefono"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <input type="submit" value="Regístrarte" className="btn solid" />
    </form>
  );
};

export default SignUpForm;
