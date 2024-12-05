import React from "react";
import { Question } from "./QuestionForm";
interface GeneratedFormProps {
  questions: Question[];
}

const GeneratedForm: React.FC<GeneratedFormProps> = ({ questions }) => {
  return (
    <div>
      <h2>Generated Form</h2>
      <form>
        {questions.map((question, index) => (
          <div key={question.id} className="form-field">
            <label>
              {index + 1}. {question.title}
              {question.required && " *"}
              {question.subtitle && <small> ({question.subtitle})</small>}
            </label>

            {/* Input Fields */}
            {question.type === "text" && <input type="text" />}
            {question.type === "textarea" && <textarea />}
            {question.type === "number" && <input type="number" />}
            {question.type === "date" && <input type="date" />}
            {question.type === "select" && (
              <select>
                <option value="">Select an option</option>
                {question.options?.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {question.type === "radio" && (
              <div>
                {question.options?.map((option, idx) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      value={option}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {question.type === "checkbox" && (
              <div>
                {question.options?.map((option, idx) => (
                  <label key={idx}>
                    <input type="checkbox" value={option} />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default GeneratedForm;
