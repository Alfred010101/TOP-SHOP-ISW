import { Box, TextField, Typography, Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

interface Address {
  streetName: string;
  exteriorNumber: string;
  interiorNumber?: string;
  postalCode: string;
  references: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

const PerfilForm = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/v1/user/data", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (userData) {
      if (name in userData.address) {
        setUserData({
          ...userData,
          address: { ...userData.address, [name]: value },
        });
      } else {
        setUserData({ ...userData, [name]: value });
      }
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8080/api/v1/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    alert("Datos actualizados");
  };

  if (!userData) return <Typography>Cargando datos...</Typography>;

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()}>
      <Typography variant="h6" gutterBottom>
        Datos personales
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Correo"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Dirección
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Calle"
            name="streetName"
            value={userData.address.streetName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Número exterior"
            name="exteriorNumber"
            value={userData.address.exteriorNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Número interior (opcional)"
            name="interiorNumber"
            value={userData.address.interiorNumber || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Código postal"
            name="postalCode"
            value={userData.address.postalCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Referencias"
            name="references"
            value={userData.address.references}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Actualizar datos
        </Button>
      </Box>
    </Box>
  );
};

export default PerfilForm;
