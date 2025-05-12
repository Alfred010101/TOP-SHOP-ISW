import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridPaginationModel,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { getUserEmailFromToken } from "../context/AuthContext";

interface Ticket {
  date: string;
  status: string;
  units: number;
  total: number;
}

interface TicketItem {
  title: string;
  amount: number;
  price: number;
}

const History = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedItems, setSelectedItems] = useState<TicketItem[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    const username = getUserEmailFromToken(token || "");

    const res = await fetch(
      `http://localhost:8080/api/v1/user/tickets?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setTickets(data);
  };

  const fetchTicketItems = async (ticketId: number) => {
    const res = await fetch(
      `http://localhost:8080/api/v1/user/tickets/${ticketId}/items`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setSelectedItems(data);
    setSelectedTicketId(ticketId);
    setOpenDetails(true);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const columns: GridColDef[] = [
    { field: "date", headerName: "Fecha", width: 280 },
    { field: "status", headerName: "Estado", width: 120 },
    { field: "units", headerName: "Unidades", width: 150 },
    { field: "total", headerName: "Total", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            //onClick={() => handleEditClick(params.row)}
            onClick={() => fetchTicketItems(params.id as number)}
          >
            Detalles
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Historial de Compras
      </Typography>
      <div style={{ width: 900 }}>
        <DataGrid
          rows={tickets}
          columns={columns}
          getRowId={(row) => row.id}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          pageSizeOptions={[5, 10, 20]}
          rowHeight={90}
        />
      </div>

      <Dialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Detalles del Ticket #{selectedTicketId}</DialogTitle>
        <DialogContent dividers>
          {selectedItems.map((item, index) => (
            <Typography key={index}>
              {item.title} — {item.amount} x ${item.price.toFixed(2)}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default History;
