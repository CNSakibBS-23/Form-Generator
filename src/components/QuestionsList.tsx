import React from "react";
import { Question } from "../types";

interface QuestionsListProps {
  questions: Question[];
  deleteQuestion: (id: number) => void;
  editQuestion: (question: Question) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  deleteQuestion,
  editQuestion,
}) => {
  return (
    <div className="questions-list">
      <h4>Questions</h4>
      {questions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              {question.title}
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => editQuestion(question)}>Edit</button>
                <button onClick={() => deleteQuestion(question.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionsList;
