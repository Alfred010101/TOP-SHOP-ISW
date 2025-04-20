import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import Navbar from "./components/Navbar";
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
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disena" element={<CustomDesign />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/como-funciona" element={<HowItWorks />} />
          <Route path="/opiniones" element={<Testimonials />} />
          <Route path="/cuenta" element={<Account />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
