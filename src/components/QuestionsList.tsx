import React from "react";
import { Question } from "../types/index";

interface QuestionListProps {
  questions: Question[];
  deleteQuestion: (id: number) => void;
  editQuestion: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  deleteQuestion,
  editQuestion,
}) => {
  return (
    <div>
      <h3>Questions List</h3>
      {questions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="question-item">
              <span>{question.title}</span> {/* Removed index numbering */}
              <button
                onClick={() => editQuestion(question)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => deleteQuestion(question.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
