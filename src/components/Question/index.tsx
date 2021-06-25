import { ReactNode } from "react";
import "styles/question.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswer?: boolean;
};

export const Question = ({
  author,
  content,
  children,
  isAnswer = false,
  isHighlighted = false
}: QuestionProps) => {
  return (
    <div
      className={`question
      ${isAnswer ? "answered" : ""}
      ${isHighlighted && !isAnswer ? "highlighted" : ""}`}
    >
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
