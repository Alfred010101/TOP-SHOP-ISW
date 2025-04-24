import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const PasswordForm = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:8080/api/v1/user/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      }
    );

    if (res.ok) {
      alert("Contraseña actualizada");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      const msg = await res.text();
      alert("Error: " + msg);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cambiar contraseña
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Contraseña actual"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nueva contraseña"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirmar nueva contraseña"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Button variant="contained" onClick={handleSubmit}>
          Actualizar contraseña
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordForm;
