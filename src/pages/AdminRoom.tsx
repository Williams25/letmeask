import React from "react";
import { Button } from "components/Button";
import { RoomCode } from "components/RoomCode";
import logoImg from "assets/images/logo.svg";
import deleteImg from "assets/images/delete.svg";
import "styles/room.scss";
import { useRoom } from "hooks/useRoom";
import { useParams, useHistory } from "react-router-dom";
import { database } from "services/firebase";
import { Question } from "components/Question";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const history = useHistory();

  const { id, questions, title } = useRoom(params.id);

  const handleEndRoom = async () => {
    if (window.confirm("Tem certeza que deseja encerra a sala?")) {
      await database.ref(`rooms/${id}`).update({
        endedAt: new Date()
      });
      history.push("/");
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Tem certeza que deseja excluir está pergunta?")) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo letmeask" />

          <div>
            <RoomCode code={id} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>

          {questions.length > 0 && (
            <span className="questions">
              {questions.length === 1
                ? questions.length + " pergunta"
                : questions.length + " perguntas"}
            </span>
          )}
        </div>
        <div className="question-list">
          {questions.map((question, index) => {
            return (
              <Question
                key={index}
                author={question.author}
                content={question.content}
              >
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={deleteImg} alt="apagar pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
