import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Paper,
  Modal,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TShirtFormData {
  title: string;
  resource: File | null;
  category: string;
  type: string;
  talla: string;
  price: string;
  existence: string;
  description: string;
}

interface TShirt {
  id: number;
  title: string;
  resource: string;
  category: string;
  type: string;
  talla: string;
  price: number;
  existence: number;
  description: string;
}

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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TShirtFormData>({
    title: "",
    resource: null,
    category: "",
    type: "",
    talla: "",
    price: "",
    existence: "",
    description: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tshirts, setTshirts] = useState<TShirt[]>([]);

  const fetchTShirts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/api/tshirts/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTshirts(data);
    } catch (error) {
      alert("Error al obtener camisetas");
    }
  };

  useEffect(() => {
    fetchTShirts();
  }, []);

  const handleChange =
    (key: keyof TShirtFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resource: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      resource: null,
      category: "",
      type: "",
      talla: "",
      price: "",
      existence: "",
      description: "",
    });
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.resource) {
      alert("Debes seleccionar una imagen.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("image", formData.resource);
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
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error("Error en la respuesta");

      alert("Camiseta guardada con éxito.");
      handleClear();
      setOpen(false);
      fetchTShirts(); // refrescar lista
    } catch (error) {
      alert("Error al guardar la camiseta.");
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ my: 3 }}>
        Registrar Camiseta
      </Button>

      {/* Modal de formulario */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 900,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h5">Registrar Camiseta</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Título"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  value={formData.title}
                  onChange={handleChange("title")}
                />

                <TextField
                  select
                  label="Categoría"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  value={formData.category}
                  onChange={handleChange("category")}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Tipo"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  value={formData.type}
                  onChange={handleChange("type")}
                >
                  {types.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Talla"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  value={formData.talla}
                  onChange={handleChange("talla")}
                >
                  {sizes.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Precio"
                  type="number"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  inputProps={{ min: 0, step: 0.01 }}
                  value={formData.price}
                  onChange={handleChange("price")}
                />

                <TextField
                  label="Existencia"
                  type="number"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  inputProps={{ min: 0 }}
                  value={formData.existence}
                  onChange={handleChange("existence")}
                />

                <TextField
                  label="Descripción"
                  fullWidth
                  multiline
                  rows={3}
                  margin="dense"
                  value={formData.description}
                  onChange={handleChange("description")}
                />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Button type="submit" variant="contained" fullWidth>
                      Guardar Camiseta
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClear}
                      fullWidth
                    >
                      Limpiar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                >
                  Subir Imagen
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                {previewUrl && (
                  <>
                    <Typography variant="body2" gutterBottom>
                      Vista previa:
                    </Typography>
                    <Box
                      component="img"
                      src={previewUrl}
                      alt="preview"
                      sx={{
                        width: "100%",
                        maxWidth: 300,
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                    />
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Tabla de camisetas */}
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Talla</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Imagen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tshirts.map((shirt) => (
            <TableRow key={shirt.id}>
              <TableCell>{shirt.title}</TableCell>
              <TableCell>{shirt.type}</TableCell>
              <TableCell>{shirt.talla}</TableCell>
              <TableCell>{shirt.category}</TableCell>
              <TableCell>${shirt.price.toFixed(2)}</TableCell>
              <TableCell>{shirt.existence}</TableCell>
              <TableCell>
                <img
                  src={`http://localhost:8080/imgs/${shirt.resource}`}
                  alt={shirt.title}
                  style={{ width: 60, borderRadius: 4 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TShirtForm;
