import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

const DireccionForm = ({ address }: { address: any }) => {
  const [formData, setFormData] = useState({
    streetName: address?.streetName || "",
    exteriorNumber: address?.exteriorNumber || "",
    interiorNumber: address?.interiorNumber || "",
    postalCode: address?.postalCode || "",
    references: address?.references || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/user/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) alert("Dirección actualizada");
    else alert("Error al actualizar dirección");
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Dirección</Typography>
      <TextField
        name="calle"
        label="Calle"
        value={formData.streetName}
        onChange={handleChange}
      />
      <TextField
        name="numeroExterior"
        label="Número exterior"
        value={formData.exteriorNumber}
        onChange={handleChange}
      />
      <TextField
        name="numeroInterior"
        label="Número interior (opcional)"
        value={formData.interiorNumber}
        onChange={handleChange}
      />
      <TextField
        name="codigoPostal"
        label="Código postal"
        value={formData.postalCode}
        onChange={handleChange}
      />
      <TextField
        name="referencias"
        label="Referencias"
        value={formData.references}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Guardar cambios
      </Button>
    </Box>
  );
};

export default DireccionForm;
