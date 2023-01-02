import "./Auth.scss";
import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import instaclone from "../../assets/png/instaclone.png";
import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm";
export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container fluid className="auth">
      <Image src={instaclone} />
      <div className="container-form">
        {showLogin ? (
          <h2>Entra para ver fotos y videos de tus amigos.</h2>
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className="change-form">
        {showLogin ? (
          <>
            ¿No tienes cuenta?
            <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
          </>
        ) : (
          <>
            ¿Tienes cuenta?
            <span onClick={() => setShowLogin(!showLogin)}>Inicia sesión</span>
          </>
        )}
      </div>
    </Container>
  );
}
