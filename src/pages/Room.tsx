import React, { useState, useEffect } from "react";
import { Button } from "components/Button";
import { RoomCode } from "components/RoomCode";
import { database } from "services/firebase";
import logoImg from "assets/images/logo.svg";
import "styles/room.scss";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<string, Questions>;

type Questions = {
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  isHighlighted: boolean;
  isAnswer: boolean;
};

const Room = () => {
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [questions, setQuestions] = useState<Array<Questions>>([]);
  const [title, setTitle] = useState<string>("");

  const params = useParams<RoomParams>();
  const history = useHistory();

  const { user } = useAuth();

  const handleSendQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user.id) {
      alert("Usuario invalido");
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatarUrl: user.avatarUrl
      },
      isHighlighted: false,
      isAnswer: false
    };

    await database.ref(`rooms/${params.id}/questions`).push(question);
    setNewQuestion("");
  };

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parseQuestion = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswer: value.isAnswer
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parseQuestion);
    });
  }, [params.id]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo letmeask" />

          <RoomCode code={params.id} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{title}</h1>

          {questions.length > 0 && (
            <span className="questions">
              {questions.length === 1
                ? questions.length + " pergunta"
                : questions.length + " perguntas"}
            </span>
          )}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <div className="form-footer">
            {!user.id ? (
              <span>
                Para enviar uma pergunta,{" "}
                <button
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  faça seu login
                </button>
                .
              </span>
            ) : (
              <div className="user-info">
                <img src={user.avatarUrl} alt={user.name} />
                <span>{user.name}</span>
              </div>
            )}
            <Button type="submit" disabled={!user.id}>
              Enviar pergunta
            </Button>
          </div>
          {JSON.stringify(questions)}
        </form>
      </main>
    </div>
  );
};

export default Room;
