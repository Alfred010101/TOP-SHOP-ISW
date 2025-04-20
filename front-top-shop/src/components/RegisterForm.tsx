import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      streetName: "",
      exteriorNumber: "",
      interiorNumber: "",
      postalCode: "",
      references: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Token recibido:", data.token);
        localStorage.setItem("token", data.token);

        navigate("/dashboard"); // redirige al dashboard
      } else {
        console.error("Error al registrarse");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Registro
        </Typography>

        <TextField
          label="Usuario"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          label="Nombre"
          name="firstName"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Apellido"
          name="lastName"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Teléfono"
          name="phone"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={handleChange}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Dirección
        </Typography>
        <TextField
          label="Calle"
          name="streetName"
          fullWidth
          margin="normal"
          value={formData.address.streetName}
          onChange={handleChange}
        />
        <TextField
          label="Número exterior"
          name="exteriorNumber"
          fullWidth
          margin="normal"
          value={formData.address.exteriorNumber}
          onChange={handleChange}
        />
        <TextField
          label="Número interior"
          name="interiorNumber"
          fullWidth
          margin="normal"
          value={formData.address.interiorNumber}
          onChange={handleChange}
        />
        <TextField
          label="Código postal"
          name="postalCode"
          fullWidth
          margin="normal"
          value={formData.address.postalCode}
          onChange={handleChange}
        />
        <TextField
          label="Referencias"
          name="references"
          fullWidth
          margin="normal"
          value={formData.address.references}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterForm;
