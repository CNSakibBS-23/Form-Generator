import React, { useState, useEffect } from "react";
import { Question, Option } from "../types";

interface QuestionFormProps {
  addQuestion: (question: Question) => void;
  editingQuestion?: Question | null;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  addQuestion,
  editingQuestion,
}) => {
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [type, setType] = useState<Question["type"]>("text");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState<Option[]>([{ id: 1, name: "" }]);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10);
  const [errors, setErrors] = useState<string>("");

  // Prefill the form fields if editing a question
  useEffect(() => {
    if (editingQuestion) {
      setTitle(editingQuestion.title);
      setInstruction(editingQuestion.instruction || "");
      setType(editingQuestion.type);
      setRequired(editingQuestion.required);
      setOptions(editingQuestion.options || []);
      setMin(editingQuestion.min || 0);
      setMax(editingQuestion.max || 10);
    }
  }, [editingQuestion]);

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setErrors("Title cannot be empty.");
      return false;
    }
    if (["select", "radio", "checkbox", "tags"].includes(type)) {
      const validOptions = options.filter((opt) => opt.name.trim() !== "");
      if (validOptions.length === 0) {
        setErrors("At least one option is required for the selected type.");
        return false;
      }
    }
    if (type === "slider" && (min >= max || min < 0 || max <= 0)) {
      setErrors(
        "Slider range is invalid. Ensure min < max and both are positive."
      );
      return false;
    }
    setErrors("");
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newQuestion: Question = {
      id: editingQuestion?.id || Date.now(),
      title,
      instruction,
      type,
      required,
      options: ["select", "radio", "checkbox", "tags"].includes(type)
        ? options.filter((opt) => opt.name.trim() !== "")
        : undefined,
      min: type === "slider" ? min : undefined,
      max: type === "slider" ? max : undefined,
    };

    addQuestion(newQuestion);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setInstruction("");
    setType("text");
    setRequired(false);
    setOptions([{ id: 1, name: "" }]);
    setMin(0);
    setMax(10);
    setErrors("");
  };

  return (
    <div className="question-form">
      <h3>{editingQuestion ? "Edit Question" : "Add Question"}</h3>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <input
        type="text"
        placeholder="Question Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Instruction (optional)"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as Question["type"])}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="textarea">Text Area</option>
        <option value="date">Date</option>
        <option value="select">Select</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
        <option value="rating">Rating</option>
        <option value="percentage">Percentage</option>
        <option value="slider">Slider</option>
        <option value="tags">Tags</option>
      </select>
      {["select", "radio", "checkbox", "tags"].includes(type) && (
        <div>
          <h4>Options</h4>
          {options.map((option, index) => (
            <input
              key={index}
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
      {type === "slider" && (
        <div>
          <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          Required
        </label>
        <button
          onClick={handleSave}
          style={{ padding: "5px 10px", fontSize: "14px", height: "30px" }}
        >
          {editingQuestion ? "Update Question" : "Save Question"}
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
