import { ReactNode } from "react";
import "styles/question.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  children?: ReactNode;
};

export const Question = ({ author, content, children }: QuestionProps) => {
  return (
    <div className="question">
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img src={author.avatarUrl} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};
