/*import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./components/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthPage mode="sign-in" />} />
        <Route path="/register" element={<AuthPage mode="sign-up" />} />
      </Routes>
    </Router>
  );
}

export default App;*/

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthPage from "./components/AuthPage";
//import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
//import CustomDesign from "./pages/CustomDesign";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Testimonials from "./pages/Testimonials";
import Cart from "./pages/Cart";
import FAQ from "./pages/FAQ";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/Home";
import CustomDesign from "./pages/CustomDesign";
import PerfilPage from "./pages/PerfilPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage mode="sign-in" />} />
          <Route path="/register" element={<AuthPage mode="sign-up" />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/design" element={<CustomDesign />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/opiniones" element={<Testimonials />} />
            <Route path="/car/*" element={<Cart />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/account/*" element={<PerfilPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
