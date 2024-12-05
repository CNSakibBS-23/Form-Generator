import React, { useState, useEffect } from "react";

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface QuestionFormProps {
  addQuestion: (question: Question) => void;
  editingQuestion: Question | null;
  updateQuestion: (updatedQuestion: Question) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  addQuestion,
  editingQuestion,
  updateQuestion,
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [type, setType] = useState("text");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState<string[]>([""]);

  useEffect(() => {
    if (editingQuestion) {
      setTitle(editingQuestion.title);
      setSubtitle(editingQuestion.subtitle || "");
      setType(editingQuestion.type);
      setRequired(editingQuestion.required);
      setOptions(editingQuestion.options || [""]);
    }
  }, [editingQuestion]);

  const handleAddQuestion = () => {
    if (title.trim() === "") return;
    const newQuestion = {
      id: Date.now(),
      title,
      subtitle,
      type,
      required,
      options: options.filter((opt) => opt.trim() !== ""),
    };
    addQuestion(newQuestion);
    resetForm();
  };

  const handleUpdateQuestion = () => {
    if (title.trim() === "") return;
    const updatedQuestion = {
      ...editingQuestion!,
      title,
      subtitle,
      type,
      required,
      options: options.filter((opt) => opt.trim() !== ""),
    };
    updateQuestion(updatedQuestion);
    resetForm();
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, ""]);
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setType("text");
    setRequired(false);
    setOptions([""]);
  };

  return (
    <div className="form-container">
      <h2>{editingQuestion ? "Edit Question" : "Create Question"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subtitle (optional)"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="textarea">Text Area</option>
        <option value="date">Date</option>
        <option value="select">Select Box</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
        <option value="rating">Star Rating</option>
      </select>
      {["radio", "checkbox", "select"].includes(type) && (
        <div className="options-container">
          <h4>Options:</h4>
          {options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={addOption}>Add Option</button>
        </div>
      )}
      <label>
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
        />
        Required
      </label>
      <button
        onClick={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
      >
        {editingQuestion ? "Update Question" : "Next"}
      </button>
    </div>
  );
};

export default QuestionForm;
