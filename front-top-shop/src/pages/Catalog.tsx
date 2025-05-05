import { useState, useEffect, useRef } from "react";

interface Product {
  resource: string;
  title: string;
  description: string;
  price: string;
  category: string;
  stock: number;
}

const categoryLabels: Record<string, string> = {
  FRASES_Y_CITAS: "Frases y Citas",
  DISENOS_ARTISTICOS: "Diseños Artísticos",
  CULTURA_POP: "Cultura Pop",
  TEMPORADAS: "Temporadas",
  DISENOS_GEEK_Y_NERD: "Diseños Geek y Nerd",
};

const getCategoryLabel = (categoryValue: string): string =>
  categoryLabels[categoryValue] ?? categoryValue;

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("FRASES_Y_CITAS");
  const [cart, setCart] = useState<Product[]>([]);
  const productSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/tshirts/list")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialFiltered = data.filter(
          (p: Product) => p.category === selectedCategory
        );
        setFilteredProducts(initialFiltered);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
      });
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCategoryClick = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
    const filtered = products.filter((p) => p.category === categoryValue);
    setFilteredProducts(filtered);
    setTimeout(() => {
      productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    console.log("Agregado al carrito:", product.title);
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "2rem",
          color: "#2c3e50",
          textTransform: "uppercase",
        }}
      >
        Catálogo TOP-SHOP
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {Object.keys(categoryLabels).map((key) => (
          <button
            key={key}
            onClick={() => handleCategoryClick(key)}
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              border: "none",
              backgroundColor: selectedCategory === key ? "#3498db" : "#ecf0f1",
              color: selectedCategory === key ? "#fff" : "#2c3e50",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
          >
            {getCategoryLabel(key)}
          </button>
        ))}
      </div>

      <div
        ref={productSectionRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
        }}
      >
        {filteredProducts.length ? (
          filteredProducts.map((product, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  color: "#2c3e50",
                  margin: "15px 0 10px",
                }}
              >
                {product.title}
              </h2>

              <p style={{ fontSize: "1rem", color: "#7f8c8d" }}>
                {product.description}
              </p>

              <img
                src={`http://localhost:8080/imgs/${product.resource}`}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <p style={{ fontWeight: "bold", color: "#27ae60" }}>
                ${parseFloat(product.price).toFixed(2)}
              </p>

              <p style={{ fontSize: "0.95rem", color: "#555" }}>
                Existencia: <strong>{product.stock}</strong>
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  style={{
                    backgroundColor:
                      product.stock === 0 ? "#bdc3c7" : "#9b59b6",
                    color: "#fff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: product.stock === 0 ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                  }}
                  disabled={product.stock === 0}
                  onMouseEnter={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.backgroundColor = "#2c3e50";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.backgroundColor = "#9b59b6";
                    }
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#7f8c8d" }}>
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
