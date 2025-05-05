import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from "../assets/img1.jpg";
import Image2 from "../assets/img2.jpg";
import Image3 from "../assets/img3.jpg";
import Image4 from "../assets/img4.jpg";
import Image5 from "../assets/img5.jpg";

interface Product {
  id: number;
  title: string;
  description: string;
  resource: string;
  price: number;
  existence: number;
  talla: string;
}

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const images = [
    { src: Image1, alt: "Diseño 1 de camisetas" },
    { src: Image2, alt: "Diseño 2 de camisetas" },
    { src: Image3, alt: "Diseño 3 de camisetas" },
    { src: Image4, alt: "Diseño 4 de camisetas" },
    { src: Image5, alt: "Diseño 5 de camisetas" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_current: number, next: number) => setActiveIndex(next),
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/tshirts/last");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    fetchProducts();
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

  const handleBuyNow = (product: Product) => {
    console.log("Comprar ahora:", product.title);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Producto agregado al carrito:", product.title);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px 40px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h1
        style={{
          marginBottom: "2rem",
          color: "#2c3e50",
          fontSize: "2.5rem",
          textTransform: "uppercase",
        }}
      >
        "Diseña tu estilo, crea tu identidad"
      </h1>

      {/* Carrusel */}
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Navegación del carrusel */}
      <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeIndex === index ? "#3498db" : "#bdc3c7",
              transition: "all 0.1s ease",
            }}
          />
        ))}
      </div>

      {/* Productos */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          marginTop: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
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
              ${product.price.toFixed(2)}
            </p>

            <p style={{ fontSize: "0.95rem", color: "#555" }}>
              Existencia: <strong>{product.existence}</strong>
            </p>

            <p style={{ fontSize: "0.95rem", color: "#555" }}>
              Talla: <strong>{product.talla}</strong>
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
                    product.existence === 0 ? "#bdc3c7" : "#9b59b6",
                  color: "#fff",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: product.existence === 0 ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                }}
                disabled={product.existence === 0}
                onMouseEnter={(e) => {
                  if (product.existence > 0) {
                    e.currentTarget.style.backgroundColor = "#2c3e50";
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.existence > 0) {
                    e.currentTarget.style.backgroundColor = "#9b59b6";
                  }
                }}
                onClick={() => handleAddToCart(product)}
              >
                {product.existence === 0 ? "Sin stock" : "Agregar al carrito"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
