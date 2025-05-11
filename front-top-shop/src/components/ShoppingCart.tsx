import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { getUserEmailFromToken } from "../context/AuthContext";

interface CartItem {
  id: number;
  fkTshirt: number;
  amount: number;
  title: string;
  resource: string;
  description: string;
  price: number;
  existence: number;
}

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const openConfirmDialog = (fkTshirt: number) => {
    setSelectedItem(fkTshirt);
    setConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setSelectedItem(null);
    setConfirmOpen(false);
  };

  const confirmDelete = () => {
    if (selectedItem !== null) {
      handleDelete(selectedItem);
    }
    closeConfirmDialog();
  };

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuario no autenticado");
        return;
      }

      const email = getUserEmailFromToken(token);
      if (!email) {
        alert("Token inválido");
        return;
      }
      const response = await fetch(
        `http://localhost:8080/api/v1/user/shoppingCart/items?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    };

    fetchCart();
  }, []);

  const handleAmountChange = async (fkTshirt: number, delta: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado");
      return;
    }

    const email = getUserEmailFromToken(token);
    if (!email) {
      alert("Token inválido");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/v1/user/shoppingCart/updateAmount",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          fkTshirt,
          delta,
        }),
      }
    );

    if (response.ok) {
      // Actualizar la cantidad localmente
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.fkTshirt === fkTshirt
            ? { ...item, amount: item.amount + delta }
            : item
        )
      );
    } else {
      alert("Error al actualizar la cantidad");
    }
  };

  const handleDelete = async (fkTshirt: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado");
      return;
    }

    const email = getUserEmailFromToken(token);
    if (!email) {
      alert("Token inválido");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/v1/user/shoppingCart/deleteItem",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          fkTshirt,
        }),
      }
    );

    if (response.ok) {
      // Eliminar el item localmente
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.fkTshirt !== fkTshirt)
      );
    } else {
      alert("Error al eliminar el producto");
    }
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Tu Carrito
      </Typography>

      {cartItems.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 2,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              marginTop: 2,
              marginLeft: 2,
              width: 200,
              height: 200,
              objectFit: "cover",
            }}
            image={`http://localhost:8080/imgs/${item.resource}`}
            alt={item.title}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Existencia: {item.existence}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Precio Unitario: ${item.price.toFixed(2)}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAmountChange(item.fkTshirt, -1)}
                disabled={item.amount <= 1}
              >
                <Remove fontSize="small" />
              </Button>

              <Typography>{item.amount}</Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => handleAmountChange(item.fkTshirt, 1)}
                disabled={item.amount === item.existence}
              >
                <Add fontSize="small" />
              </Button>

              <IconButton
                color="error"
                onClick={() => openConfirmDialog(item.fkTshirt)}
                sx={{
                  ml: "auto",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#ccc",
                  },
                }}
              >
                <Delete />
              </IconButton>
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Subtotal: ${(item.amount * item.price).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">${total}</Typography>
      </Box>

      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ float: "right" }}
          style={{
            marginTop: 10,
            backgroundColor: "#9b59b6",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2c3e50";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#9b59b6";
          }}
        >
          Proceder a pagar
        </Button>
      )}
      <Dialog open={confirmOpen} onClose={closeConfirmDialog}>
        <DialogTitle>¿Eliminar producto?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar este producto del carrito?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShoppingCart;
