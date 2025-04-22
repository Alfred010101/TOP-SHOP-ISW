import React from "react";
import "../App.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Panel from "./Panel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AuthPageProps {
  mode: "sign-in" | "sign-up";
}

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const { setError } = useAuth();
  const isSignUpMode = mode === "sign-up";
  const navigate = useNavigate();

  const handleModeChange = (newMode: "sign-in" | "sign-up") => {
    navigate(newMode === "sign-up" ? "/register" : "/login");
    setError(null);
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>
      <div className="panels-container">
        <Panel
          position="left"
          title="¿Nuevo en nuestra tienda?"
          text="Únete a nuestra comunidad de moda y disfruta de descuentos exclusivos, seguimiento de pedidos y una experiencia personalizada."
          image="src/assets/log.svg"
          buttonText="Regístrate"
          onClick={() => handleModeChange("sign-up")}
        />
        <Panel
          position="right"
          title="¿Ya eres cliente?"
          text="Accede a tu cuenta para continuar descubriendo las últimas tendencias y completar tus compras más rápido."
          image="src/assets/register.svg"
          buttonText="Iniciar sesión"
          onClick={() => handleModeChange("sign-in")}
        />
      </div>
    </div>
  );
};

export default AuthPage;
