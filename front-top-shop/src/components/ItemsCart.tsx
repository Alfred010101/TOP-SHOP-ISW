import { Toolbar } from "@mui/material";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // opcional
}

const ItemsCart: React.FC = () => {
  const [items, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Playera Azul",
      price: 20,
      quantity: 2,
      image: "/img/shirt-blue.jpg",
    },
    { id: 2, name: "Jeans", price: 35, quantity: 1 },
  ]);

  const onRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Toolbar
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            top: 2000, // espacio para el AppBar
          },
        }}
      ></Toolbar>
      <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center space-x-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => onRemove(item.id)}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-semibold text-right">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default ItemsCart;
