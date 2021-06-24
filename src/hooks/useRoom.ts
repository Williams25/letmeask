import { useState, useEffect } from "react";
import { database } from "services/firebase";
import { useAuth } from "hooks/useAuth";

type FirebaseQuestions = Record<string, Questions>;

type Questions = {
  id: string;
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  isHighlighted: boolean;
  isAnswer: boolean;
  likes: Record<
    string,
    {
      authorId: string;
    }
  >;
  likeCount: number;
  likeId: string | undefined;
};

export const useRoom = (roomId: string) => {
  const [questions, setQuestions] = useState<Array<Questions>>([]);
  const [title, setTitle] = useState<string>("");

  const { user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
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
            isAnswer: value.isAnswer,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(([key, value]) => {
              console.log(key);
              return value.authorId === user.id;
            })?.[0]
          };
        }
      );
      setTitle(databaseRoom.title);

      // eslint-disable-next-line
      setQuestions(parseQuestion as any);
    });
    return () => {
      roomRef.off("value");
    };
  }, [roomId, user.id]);

  return {
    questions,
    title,
    id: roomId
  };
};
