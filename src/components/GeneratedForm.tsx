import React, { useState } from "react";
import { Question } from "./QuestionForm";

interface GeneratedFormProps {
  questions: Question[];
  handleSubmitForm: (formData: Record<string, any>) => void;
}

const GeneratedForm: React.FC<GeneratedFormProps> = ({
  questions,
  handleSubmitForm,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (questionId: number, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleRatingChange = (questionId: number, rating: number) => {
    setRatings((prevRatings) => ({ ...prevRatings, [questionId]: rating }));
    setFormData((prev) => ({
      ...prev,
      [questionId]: rating,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
        {questions.map((question, index) => (
          <div key={question.id} className="form-field">
            <label>
              {index + 1}. {question.title}
              {question.required && " *"}
              {question.subtitle && <small> ({question.subtitle})</small>}
            </label>
            {question.type === "rating" && (
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      ratings[question.id] >= star ? "selected" : ""
                    }`}
                    onClick={() => handleRatingChange(question.id, star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}

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
                      checked={formData[question.id] === option}
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value)
                      }
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
                    <input
                      type="checkbox"
                      value={option}
                      checked={
                        Array.isArray(formData[question.id]) &&
                        formData[question.id].includes(option)
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const value = option;
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
                    {option}
                  </label>
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
