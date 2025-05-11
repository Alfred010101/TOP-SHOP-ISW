import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridPaginationModel,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Paper,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Tshirt {
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

interface TablaRegistrosProps {
  refresh?: boolean;
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

const TablaRegistros: React.FC<TablaRegistrosProps> = ({ refresh }) => {
  const [tshirts, setTshirts] = useState<Tshirt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTshirt, setSelectedTshirt] = useState<Tshirt | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchTshirts = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/tshirts/list")
      .then((res) => res.json())
      .then((data) => {
        setTshirts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTshirts();
  }, [refresh]);

  const handleEditClick = (tshirt: Tshirt) => {
    setSelectedTshirt(tshirt);
    setPreviewUrl(`http://localhost:8080/imgs/${tshirt.resource}`);
    setEditOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta camiseta?")) {
      fetch(`http://localhost:8080/api/tshirts/delete/${id}`, {
        method: "DELETE",
      })
        .then(() => fetchTshirts())
        .catch((err) => console.error("Error eliminando:", err));
    }
  };

  const handleChange =
    (key: keyof Tshirt) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedTshirt) {
        setSelectedTshirt({
          ...selectedTshirt,
          [key]: e.target.value,
        });
      }
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      if (selectedTshirt) {
        // Aquí podrías manejar el archivo para la actualización
        // Nota: Necesitarías adaptar tu backend para manejar la actualización de imágenes
      }
    }
  };

  const handleEditSave = async () => {
    if (!selectedTshirt) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:8080/api/tshirts/update/${selectedTshirt.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedTshirt),
        }
      );

      if (!res.ok) throw new Error("Error en la respuesta");

      alert("Camiseta actualizada con éxito.");
      fetchTshirts();
      setEditOpen(false);
    } catch (error) {
      alert("Error al actualizar la camiseta.");
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Título", width: 270 },
    { field: "type", headerName: "Tipo", width: 100 },
    { field: "category", headerName: "Categoría", width: 220 },
    {
      field: "price",
      headerName: "Precio",
      width: 100,
      valueFormatter: (params) => `$${Number(params).toFixed(2)}`,
    },
    { field: "existence", headerName: "Stock", width: 100 },
    {
      field: "image",
      headerName: "Imagen",
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Box
          component="img"
          src={`http://localhost:8080/imgs/${params.row.resource}`}
          alt="Tshirt"
          width={80}
          height={80}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 220,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEditClick(params.row)}
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row.id)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div>
        <DataGrid
          rows={tshirts}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          pageSizeOptions={[5, 10, 20]}
          rowHeight={90}
        />
      </div>

      {/* Modal de edición */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
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
            <Typography variant="h5">Editar Camiseta</Typography>
            <IconButton onClick={() => setEditOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box component="form">
                <TextField
                  label="Título"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  value={selectedTshirt?.title || ""}
                  onChange={handleChange("title")}
                />

                <TextField
                  select
                  label="Categoría"
                  fullWidth
                  required
                  size="small"
                  margin="dense"
                  value={selectedTshirt?.category || ""}
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
                  value={selectedTshirt?.type || ""}
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
                  value={selectedTshirt?.talla || ""}
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
                  value={selectedTshirt?.price || ""}
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
                  value={selectedTshirt?.existence || ""}
                  onChange={handleChange("existence")}
                />

                <TextField
                  label="Descripción"
                  fullWidth
                  multiline
                  rows={3}
                  margin="dense"
                  value={selectedTshirt?.description || ""}
                  onChange={handleChange("description")}
                />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      onClick={handleEditSave}
                      fullWidth
                    >
                      Guardar Cambios
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditOpen(false)}
                      fullWidth
                    >
                      Cancelar
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
                  Cambiar Imagen
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
    </>
  );
};

export default TablaRegistros;
