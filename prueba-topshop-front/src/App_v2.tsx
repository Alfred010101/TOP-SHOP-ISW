// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import CustomDesign from "./pages/CustomDesign";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Testimonials from "./pages/Testimonials";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disena" element={<CustomDesign />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/como-funciona" element={<HowItWorks />} />
          <Route path="/opiniones" element={<Testimonials />} />
          <Route path="/cuenta" element={<Account />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
