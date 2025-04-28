import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image1 from '../assets/img1.jpg';
import Image2 from '../assets/img2.jpg';
import Image3 from '../assets/img3.jpg';
import Image4 from '../assets/img4.jpg';
import Image5 from '../assets/img5.jpg';
import ImgProduct1 from '../assets/playera1.jpg';
import ImgProduct2 from '../assets/playera2.jpg';
import ImgProduct3 from '../assets/playera3.jpg';
import ImgProduct4 from '../assets/playera4.jpg';
import ImgProduct5 from '../assets/playera5.jpg';
import ImgProduct6 from '../assets/playera6.jpg';
import ImgProduct7 from '../assets/playera7.jpg';
import ImgProduct8 from '../assets/playera8.jpg';
import ImgProduct9 from '../assets/playera9.jpg';
import ImgProduct10 from '../assets/playera10.jpg';
import ImgProduct11 from '../assets/playera11.jpg';
import ImgProduct12 from '../assets/playera12.jpg';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cart, setCart] = useState<any[]>([]);

  const images = [
    { src: Image1, alt: "Diseño 1 de camisetas" },
    { src: Image2, alt: "Diseño 2 de camisetas" },
    { src: Image3, alt: "Diseño 3 de camisetas" },
    { src: Image4, alt: "Diseño 4 de camisetas" },
    { src: Image5, alt: "Diseño 5 de camisetas" }
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

  const products = [
    {
      img: ImgProduct1,
      title: 'Playera Clásica Mariposa',
      description: 'Algodón 100%, cómoda para el día a día.'
    },
    {
      img: ImgProduct2,
      title: 'Playera Arte Urbano',
      description: 'Estilo retro para destacar en cualquier ocasión.'
    },
    {
      img: ImgProduct3,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT.'
    },
    {
      img: ImgProduct4,
      title: 'Playera negra Mariposas',
      description: 'Estilo retro para destacar en cualquier ocasión.'
    },
    {
      img: ImgProduct5,
      title: 'Playera negra Mariposas',
      description: 'Serpiente Esqueleto para gente edgy'
    },
    {
      img: ImgProduct6,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT pero cafe.'
    },
    {
      img: ImgProduct7,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT.'
    },
    {
      img: ImgProduct8,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT.'
    },
    {
      img: ImgProduct9,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT.'
    },
    {
      img: ImgProduct10,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT.'
    },
    {
      img: ImgProduct11,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT.'
    },
    {
      img: ImgProduct12,
      title: 'Playera negra Mariposas',
      description: 'Inspirada en Yuta de NCT.'
    },
  ];

  //Carrito
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleBuyNow = (product: any) => {
    console.log('Comprar ahora:', product.title);
  };

  const handleAddToCart = (product: any) => {
    setCart(prevCart => [...prevCart, product]);
    console.log('Producto agregado al carrito:', product.title);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px 40px',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{
        marginBottom: '2rem',
        color: '#2c3e50',
        fontSize: '2.5rem',
        textTransform: 'uppercase'
      }}>
        "Diseña tu estilo, crea tu identidad"
      </h1>

    
      <div style={{
        width: '90%',
        maxWidth: '1200px',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
      }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Navegaci[on] */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginTop: '30px'
      }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeIndex === index ? '#3498db' : '#bdc3c7',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* PRODUCTOS */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        marginTop: '50px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px'
      }}>
        {products.map((product, idx) => (
          <div key={idx} style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            textAlign: 'center',
            padding: '20px'
          }}>
            <img
              src={product.img}
              alt={product.title}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
            <h2 style={{
              fontSize: '1.5rem',
              color: '#2c3e50',
              margin: '15px 0 10px'
            }}>{product.title}</h2>
            <p style={{
              fontSize: '1rem',
              color: '#7f8c8d'
            }}>{product.description}</p>

            {/*COMPRA */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginTop: '15px'
            }}>
              <button
                style={{
                  backgroundColor: ' #9b59b6 ',
                  color: '#fff',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                onClick={() => handleBuyNow(product)}
              >
                Comprar ahora
              </button>

              <button
                style={{
                  backgroundColor: '#34495e',
                  color: '#fff',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
                onClick={() => handleAddToCart(product)}
              >
                Agregar al carrito
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
