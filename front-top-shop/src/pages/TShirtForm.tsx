import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

interface TShirtFormData {
  title: string;
  imageFile: File | null;
  category: string;
  type: string;
  talla: string;
  price: string;
  existence: string;
  description: string;
}

// Mapea el texto amigable con el valor real que espera el backend
const categories = [
  { label: "Frases y Citas", value: "FRASES_Y_CITAS" },
  { label: "Diseños Artísticos", value: "DISENOS_ARTISTICOS" },
  { label: "Cultura Pop", value: "CULTURA_POP" },
  { label: "Temporadas", value: "TEMPORADAS" },
  { label: "Diseños Geek y Nerd", value: "DISENOS_GEEK_Y_NERD" },
];

const types = [
  { label: "Hombre", value: "HOMBRE" },
  { label: "Mujer", value: "MUJER" },
  { label: "Niño", value: "NINO" },
  { label: "Niña", value: "NINA" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const TShirtForm: React.FC = () => {
  const [formData, setFormData] = useState<TShirtFormData>({
    title: "",
    imageFile: null,
    category: "",
    type: "",
    talla: "",
    price: "",
    existence: "",
    description: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange =
    (key: keyof TShirtFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.imageFile) {
      alert("Debes seleccionar una imagen.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("image", formData.imageFile); // El archivo de la imagen
    data.append("category", formData.category);
    data.append("type", formData.type);
    data.append("talla", formData.talla);
    data.append("price", formData.price);
    data.append("existence", formData.existence);
    data.append("description", formData.description);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/api/tshirts/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Solo el token en los encabezados
        },
        body: data, // FormData se encarga del Content-Type automáticamente
      });

      if (!res.ok) throw new Error("Error en la respuesta");

      alert("Camiseta guardada con éxito.");
      setFormData({
        title: "",
        imageFile: null,
        category: "",
        type: "",
        talla: "",
        price: "",
        existence: "",
        description: "",
      });
      setPreviewUrl(null);
    } catch (error) {
      alert("Error al guardar la camiseta.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Registrar Camiseta
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Título"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange("title")}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {previewUrl && (
              <Box mt={2}>
                <Typography variant="body2">Vista previa:</Typography>
                <img src={previewUrl} alt="preview" width={200} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Categoría"
              fullWidth
              required
              value={formData.category}
              onChange={handleChange("category")}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Tipo"
              fullWidth
              required
              value={formData.type}
              onChange={handleChange("type")}
            >
              {types.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              select
              label="Talla"
              fullWidth
              required
              value={formData.talla}
              onChange={handleChange("talla")}
            >
              {sizes.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              label="Precio"
              type="number"
              fullWidth
              required
              inputProps={{ min: 0, step: 0.01 }}
              value={formData.price}
              onChange={handleChange("price")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Existencia"
              type="number"
              fullWidth
              required
              inputProps={{ min: 0 }}
              value={formData.existence}
              onChange={handleChange("existence")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Guardar Camiseta
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TShirtForm;
