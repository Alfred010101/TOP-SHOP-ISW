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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

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

const TablaRegistros: React.FC<TablaRegistrosProps> = ({ refresh }) => {
  const [tshirts, setTshirts] = useState<Tshirt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [selectedTshirt, setSelectedTshirt] = useState<Tshirt | null>(null);

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
  }, [refresh]); // Se ejecuta cuando cambia 'refresh'

  const handleEditClick = (tshirt: Tshirt) => {
    setSelectedTshirt(tshirt);
    setEditOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta camiseta?")) {
      fetch(`http://localhost:8080/api/tshirts/delete/${id}`, {
        method: "DELETE",
      })
        .then(() => fetchTshirts()) // Recarga los datos después de eliminar
        .catch((err) => console.error("Error eliminando:", err));
    }
  };

  const handleEditSave = () => {
    if (selectedTshirt) {
      fetch(`http://localhost:8080/api/tshirts/update/${selectedTshirt.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTshirt),
      })
        .then(() => {
          fetchTshirts(); // Recarga los datos después de editar
          setEditOpen(false);
        })
        .catch((err) => console.error("Error actualizando:", err));
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
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar camiseta</DialogTitle>
        <DialogContent>
          {selectedTshirt && (
            <>
              <TextField
                label="Título"
                fullWidth
                margin="dense"
                value={selectedTshirt.title}
                onChange={(e) =>
                  setSelectedTshirt({
                    ...selectedTshirt,
                    title: e.target.value,
                  })
                }
              />
              <TextField
                label="Tipo"
                fullWidth
                margin="dense"
                value={selectedTshirt.type}
                onChange={(e) =>
                  setSelectedTshirt({ ...selectedTshirt, type: e.target.value })
                }
              />
              <TextField
                label="Talla"
                fullWidth
                margin="dense"
                value={selectedTshirt.talla}
                onChange={(e) =>
                  setSelectedTshirt({
                    ...selectedTshirt,
                    talla: e.target.value,
                  })
                }
              />
              <TextField
                label="Categoría"
                fullWidth
                margin="dense"
                value={selectedTshirt.category}
                onChange={(e) =>
                  setSelectedTshirt({
                    ...selectedTshirt,
                    category: e.target.value,
                  })
                }
              />
              <TextField
                label="Precio"
                type="number"
                fullWidth
                margin="dense"
                value={selectedTshirt.price}
                onChange={(e) =>
                  setSelectedTshirt({
                    ...selectedTshirt,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <TextField
                label="Stock"
                type="number"
                fullWidth
                margin="dense"
                value={selectedTshirt.existence}
                onChange={(e) =>
                  setSelectedTshirt({
                    ...selectedTshirt,
                    existence: parseInt(e.target.value),
                  })
                }
              />
              <TextField
                label="Descripción"
                fullWidth
                margin="dense"
                value={selectedTshirt.description}
                onChange={(e) =>
                  setSelectedTshirt({
                    ...selectedTshirt,
                    description: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablaRegistros;
