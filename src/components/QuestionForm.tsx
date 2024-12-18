import React, { useState, useEffect } from "react";
import { Question, Option } from "../types";

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
  const [type, setType] = useState<Question["type"]>("text");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState<Option[]>([{ id: 1, name: "" }]);
  const [min, setMin] = useState<number>(0); // For slider
  const [max, setMax] = useState<number>(10);

  useEffect(() => {
    if (editingQuestion) {
      setTitle(editingQuestion.title);
      setSubtitle(editingQuestion.subtitle || "");
      setType(editingQuestion.type);
      setRequired(editingQuestion.required);
      setOptions(editingQuestion.options || [{ id: 1, name: "" }]);
      setMin(editingQuestion.min || 0);
      setMax(editingQuestion.max || 10);
    }
  }, [editingQuestion]);

  const handleSave = () => {
    if (!title.trim()) return;

    const newQuestion: Question = {
      id: editingQuestion?.id || Date.now(),
      title,
      subtitle,
      type,
      required,
      options: ["select", "radio", "checkbox", "tags"].includes(type)
        ? options.filter((opt) => opt.name.trim() !== "")
        : undefined,
      min: type === "slider" ? min : undefined,
      max: type === "slider" ? max : undefined,
    };

    editingQuestion ? updateQuestion(newQuestion) : addQuestion(newQuestion);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setType("text");
    setRequired(false);
    setOptions([{ id: 1, name: "" }]);
    setMin(0);
    setMax(10);
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
      <select
        value={type}
        onChange={(e) => setType(e.target.value as Question["type"])}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="textarea">Text Area</option>
        <option value="date">Date</option>
        <option value="select">Select Box</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
        <option value="rating">Star Rating</option>
        <option value="percentage">Percentage</option>
        <option value="slider">Number Slider</option>
        <option value="tags">Tags</option>
      </select>

      {type === "slider" && (
        <div>
          <input
            type="number"
            placeholder="Min Value"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Value"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
      )}

      {["radio", "checkbox", "select", "tags"].includes(type) && (
        <div>
          <h4>Options:</h4>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.name}
                onChange={(e) =>
                  setOptions((prev) =>
                    prev.map((opt, idx) =>
                      idx === index ? { ...opt, name: e.target.value } : opt
                    )
                  )
                }
              />
            </div>
          ))}
          <button
            onClick={() =>
              setOptions([...options, { id: Date.now(), name: "" }])
            }
          >
            Add Option
          </button>
        </div>
      )}

      <label>
        <input
          type="checkbox"
          checked={required}
          onChange={() => setRequired((prev) => !prev)}
        />
        Required
      </label>
      <button onClick={handleSave}>
        {editingQuestion ? "Update Question" : "Add Question"}
      </button>
    </div>
  );
};

export default QuestionForm;
