import { useState, useRef, useEffect } from 'react';
import Imgfrases1 from '../assets/frases1.jpg';
import Imgfrases2 from '../assets/frases2.jpg';
import Imgfrases3 from '../assets/frases3.jpg';
import Imgart1 from '../assets/art1.jpg';
import Imgart2 from '../assets/art2.jpg';
import Imgart3 from '../assets/art3.jpg';
import Imgpop1 from '../assets/pop1.jpg';
import Imgpop2 from '../assets/pop2.jpg';
import Imgpop3 from '../assets/pop3.jpg';
import Imgtemp1 from '../assets/temp1.jpg';
import Imgtemp2 from '../assets/temp2.jpg';
import Imgtemp3 from '../assets/temp3.jpg';
import Imgner1 from '../assets/ner1.jpg';
import Imgner2 from '../assets/ner2.jpg';
import Imgner3 from '../assets/ner3.jpg';

interface Product {
  img: string;
  title: string;
  description: string;
  price: string;
  category: string;
  stock: number;
}

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('Frases y Citas');
  const productSectionRef = useRef(null);
  const [cart, setCart] = useState([]);

  const products = [
    // Frases y Citas
    {
      img: Imgfrases1,
      title: 'Playera Frase Inspiradora',
      description: 'Algodón 100%, cómoda para el día.',
      price: '$249 MXN',
      category: 'Frases y Citas',
      stock: 10
    },
    {
      img: Imgfrases2,
      title: 'Frase en Blanco',
      description: 'Mensaje positivo en un diseño limpio.',
      price: '$259 MXN',
      category: 'Frases y Citas',
      stock: 10
    },
    {
      img: Imgfrases3,
      title: 'Frase Minimalista',
      description: 'Ideal para un look sencillo y elegante.',
      price: '$269 MXN',
      category: 'Frases y Citas',
      stock: 10
    },
  
    // Diseños Artísticos
    {
      img: Imgart1,
      title: 'Playera Arte Urbano',
      description: 'Estilo retro para destacar.',
      price: '$269 MXN',
      category: 'Diseños Artísticos',
      stock: 10
    },
    {
      img: Imgart2,
      title: 'Diseño de Galaxia',
      description: 'Explora el arte del universo.',
      price: '$279 MXN',
      category: 'Diseños Artísticos',
      stock: 10
    },
    {
      img: Imgart3,
      title: 'Trazos Abstractos',
      description: 'Arte moderno en tu outfit diario.',
      price: '$269 MXN',
      category: 'Diseños Artísticos',
      stock: 10
    },
  
    // Cultura Pop
    {
      img: Imgpop1,
      title: 'Playera Anime',
      description: 'Inspirada en tu cantante favorito.',
      price: '$249 MXN',
      category: 'Cultura Pop',
      stock: 10
    },
    {
      img: Imgpop2,
      title: 'Cómics Retro',
      description: 'Pretty boy dirty boy.',
      price: '$259 MXN',
      category: 'Cultura Pop',
      stock: 10
    },
    {
      img: Imgpop3,
      title: 'Cómics Retro',
      description: 'Reviviendo el rock.',
      price: '$259 MXN',
      category: 'Cultura Pop',
      stock: 10
    },
  
    // Temporadas
    {
      img: Imgtemp1,
      title: 'Playera Verano',
      description: 'Ligera y colorida para días soleados.',
      price: '$239 MXN',
      category: 'Temporadas',
      stock: 10
    },
    {
      img: Imgtemp2,
      title: 'Diseño Navideño',
      description: 'Celebra la temporada con estilo.',
      price: '$279 MXN',
      category: 'Temporadas',
      stock: 10
    },
    {
      img: Imgtemp3,
      title: 'Cómics Retro',
      description: 'Diseño clásico para el calor.',
      price: '$259 MXN',
      category: 'Temporadas',
      stock: 10
    },
  
    // Diseños Geek y Nerd
    {
      img: Imgner1,
      title: 'Playera Código Binario',
      description: 'Solo para verdaderos geeks.',
      price: '$259 MXN',
      category: 'Diseños Geek y Nerd',
      stock: 10
    },
    {
      img: Imgner2,
      title: 'Diseño Matemático',
      description: 'Estilo de poder.',
      price: '$269 MXN',
      category: 'Diseños Geek y Nerd',
      stock: 10
    },
    {
      img: Imgner3,
      title: 'Cómics Retro',
      description: 'Diseño colorido.',
      price: '$259 MXN',
      category: 'Diseños Geek y Nerd',
      stock: 10
    },
  ];
  

  const categories = [
    'Frases y Citas',
    'Diseños Artísticos',
    'Cultura Pop',
    'Temporadas',
    'Diseños Geek y Nerd'
  ];

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      productRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBuyNow = (product: Product) => {
    console.log('Comprar ahora:', product.title);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    console.log('Agregado al carrito:', product.title);
  };
  

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem', color: '#2c3e50' }}>
        Catálogo TOP-SHOP
      </h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: selectedCategory === cat ? '#3498db' : '#ecf0f1',
              color: selectedCategory === cat ? '#fff' : '#2c3e50',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div ref={productSectionRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px'
      }}>
        {filteredProducts.length ? filteredProducts.map((product, idx) => (
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
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: 'center' }}
            />
            <h2 style={{ fontSize: '1.5rem', color: '#2c3e50', margin: '15px 0 10px' }}>{product.title}</h2>
            <p style={{ fontSize: '1rem', color: '#7f8c8d' }}>{product.description}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#34495e', marginTop: '10px' }}>{product.price}</p>
            <p style={{ fontSize: '1rem', color: '#27ae60', marginTop: '10px' }}> 
              En existencia: {product.stock}
              </p>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <button
                style={{ backgroundColor: '#9b59b6', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => handleBuyNow(product)}
              >
                Comprar ahora
              </button>
              <button
                style={{ backgroundColor: '#34495e', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => handleAddToCart(product)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        )) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#95a5a6' }}>
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
