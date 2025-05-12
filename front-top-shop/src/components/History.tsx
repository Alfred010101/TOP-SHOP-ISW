import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridPaginationModel,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Typography, Button, Modal, Box, Divider } from "@mui/material";
import { getUserEmailFromToken } from "../context/AuthContext";
import { Details } from "@mui/icons-material";

interface Ticket {
  id: number;
  date: string;
  status: string;
  units: number;
  total: number;
}

interface TicketItem {
  tshirtId: number;
  title: string;
  amount: number;
  price: number;
}

interface Address {
  streetName: string;
  exteriorNumber: string;
  interiorNumber?: string;
  postalCode: string;
  references?: string;
}

interface TicketDetails {
  cart_name: string;
  cart_number: string;
  address: Address;
  items: TicketItem[];
}

interface Tshirt {
  id: number;
  imageUrl: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

const History = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [ticketDetails, setTicketDetails] = useState<TicketDetails | null>(
    null
  );
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
      `http://localhost:8080/api/v1/user/tickets/full/${ticketId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data: TicketDetails = await res.json();
    setTicketDetails(data);
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
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => fetchTicketItems(params.id as number)}
        >
          Detalles
        </Button>
      ),
    },
  ];

  const calculateTotal = () => {
    if (!ticketDetails) return 0;
    return ticketDetails.items.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );
  };

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

      <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Detalles del Ticket #{selectedTicketId}
          </Typography>

          {ticketDetails && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Dirección de Envío:
              </Typography>
              <Typography>
                {ticketDetails.address.streetName} #
                {ticketDetails.address.exteriorNumber}
                {ticketDetails.address.interiorNumber &&
                  ` Int. ${ticketDetails.address.interiorNumber}`}
                <br />
                CP: {ticketDetails.address.postalCode}
                <br />
                {ticketDetails.address.references}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Datos de Pago:
              </Typography>
              <Typography>
                Nombre en la tarjeta: {ticketDetails.cart_name}
                <br />
                Número de tarjeta: **** **** ****{" "}
                {ticketDetails.cart_number.slice(-4)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Productos:
              </Typography>
              <details>
                {ticketDetails.items.map((item, index) => (
                  <Typography key={index}>
                    {item.title} — {item.amount} x ${item.price.toFixed(2)} = $
                    {(item.amount * item.price).toFixed(2)}
                  </Typography>
                ))}

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">
                  Total: ${calculateTotal().toFixed(2)}
                </Typography>
              </details>
              <Box mt={2} textAlign="right">
                <Button onClick={() => setOpenDetails(false)}>Cerrar</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default History;
