import React from "react";
import { Button } from "components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import illustrationImg from "assets/images/illustration.svg";
import logoImg from "assets/images/logo.svg";
import googleImg from "assets/images/google-icon.svg";
import "styles/auth.scss";

// eslint-disable-next-line
export const Home = () => {
  const history = useHistory();

  const { user, singInWithGoogle } = useAuth();

  const handleCreateRoom = async (): Promise<void> => {
    if (user.name === "") {
      await singInWithGoogle();
      history.push("/rooms/new");
    } else {
      history.push("/rooms/new");
    }
  };

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ou ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo letmeask" />

          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
