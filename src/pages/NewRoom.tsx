import React, { useState } from "react";
import { Button } from "components/Button";
import { useAuth } from "hooks/useAuth";
import { database } from "services/firebase";
import { Link, useHistory } from "react-router-dom";
import illustrationImg from "assets/images/illustration.svg";
import logoImg from "assets/images/logo.svg";
import "styles/auth.scss";

// eslint-disable-next-line
export const NewRoom = () => {
  const [newRoom, setNewRoom] = useState<string>("");
  const { user } = useAuth();

  const history = useHistory();

  const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user.id
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
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
          <h1>{user.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
