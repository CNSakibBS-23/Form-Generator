import React, { useState } from "react";
import { Question } from "../types"; // Assuming centralized types

interface GeneratedFormProps {
  questions: Question[];
  handleSubmitForm: (formData: Record<string, any>) => void;
}

const GeneratedForm: React.FC<GeneratedFormProps> = ({
  questions,
  handleSubmitForm,
}) => {
  const [formData, setFormData] = useState<Record<number, any>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

  const handleInputChange = (questionId: number, value: any) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<number, string> = {};
    questions.forEach((question) => {
      if (question.required && !formData[question.id]) {
        newErrors[question.id] = `${question.title} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSubmitForm(formData);
    }
  };

  return (
    <div>
      <h2>Generated Form</h2>
      <form>
        {questions.map((question) => (
          <div key={question.id} className="form-field">
            <label>
              {question.title}
              {question.required && " *"}
            </label>

            {/* Render input based on question type */}
            {question.type === "text" && (
              <input
                type="text"
                value={formData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}

            {question.type === "textarea" && (
              <textarea
                value={formData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}

            {question.type === "number" && (
              <input
                type="number"
                value={formData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}

            {question.type === "date" && (
              <input
                type="date"
                value={formData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            )}

            {question.type === "select" && (
              <select
                value={formData[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              >
                <option value="">Select an option</option>
                {question.options?.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            )}

            {question.type === "radio" && (
              <div>
                {question.options?.map((option) => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={`q${question.id}`}
                      value={option.name}
                      checked={formData[question.id] === option.name}
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value)
                      }
                    />
                    {option.name}
                  </label>
                ))}
              </div>
            )}

            {question.type === "checkbox" && (
              <div>
                {question.options?.map((option) => (
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      value={option.name}
                      checked={
                        Array.isArray(formData[question.id]) &&
                        formData[question.id].includes(option.name)
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const value = option.name;
                        setFormData((prev) => {
                          const prevValues = prev[question.id] || [];
                          return {
                            ...prev,
                            [question.id]: checked
                              ? [...prevValues, value]
                              : prevValues.filter((v: any) => v !== value),
                          };
                        });
                      }}
                    />
                    {option.name}
                  </label>
                ))}
              </div>
            )}

            {question.type === "rating" && (
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      formData[question.id] >= star ? "selected" : ""
                    }`}
                    onClick={() => handleInputChange(question.id, star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}

            {errors[question.id] && (
              <small style={{ color: "red" }}>{errors[question.id]}</small>
            )}
          </div>
        ))}
        <button
          type="button"
          className="create-form-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GeneratedForm;
