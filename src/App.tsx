import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import QuestionsList from "./components/QuestionsList";
import { Question, Section } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formInstruction, setFormInstruction] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now(),
      title: "",
      description: "",
      importance: "",
      questions: [],
    };
    setSections((prev) => [...prev, newSection]);
  };

  const addQuestionToSection = (sectionId: number, question: Question) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, questions: [...section.questions, question] }
          : section
      )
    );
  };

  const updateQuestionInSection = (
    sectionId: number,
    updatedQuestion: Question
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              questions: section.questions.map((q) =>
                q.id === updatedQuestion.id ? updatedQuestion : q
              ),
            }
          : section
      )
    );
  };

  const handleCreateForm = () => {
    if (!formTitle.trim() || sections.length === 0) {
      alert("Form title and at least one section are required.");
      return;
    }

    const formattedJson = {
      form_uid: `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      survey_title: formTitle,
      instruction: formInstruction,
      deadline: formDeadline,
      total_questions: sections.reduce(
        (total, section) => total + section.questions.length,
        0
      ),
      categories: sections.map((section) => ({
        id: section.id,
        section_title: section.title,
        section_description: section.description,
        section_importance: section.importance,
        questions: section.questions.map((question) => ({
          id: question.id,
          question_title: question.title,
          instruction: question.instruction,
          required: question.required,
          type: question.type,
          options: question.options || [],
          min: question.min,
          max: question.max,
        })),
      })),
    };

    console.log("Generated Form JSON:", JSON.stringify(formattedJson, null, 2));
  };

  return (
    <div className="container">
      <div className="form-details">
        <h2>Form Details</h2>
        <input
          type="text"
          placeholder="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <textarea
          placeholder="Form Instruction"
          value={formInstruction}
          onChange={(e) => setFormInstruction(e.target.value)}
        />
        <input
          type="date"
          placeholder="mm/dd/yyyy"
          value={formDeadline}
          onChange={(e) => setFormDeadline(e.target.value)}
        />
        <button onClick={addSection} className="add-section-btn">
          Add Section
        </button>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="section-container">
          <h3>{`Section ${sections.indexOf(section) + 1}`}</h3>
          <input
            type="text"
            placeholder="Section Title"
            value={section.title}
            onChange={(e) =>
              setSections((prev) =>
                prev.map((s) =>
                  s.id === section.id ? { ...s, title: e.target.value } : s
                )
              )
            }
          />
          <textarea
            placeholder="Section Description"
            value={section.description}
            onChange={(e) =>
              setSections((prev) =>
                prev.map((s) =>
                  s.id === section.id
                    ? { ...s, description: e.target.value }
                    : s
                )
              )
            }
          />
          <input
            type="text"
            placeholder="Section Importance"
            value={section.importance}
            onChange={(e) =>
              setSections((prev) =>
                prev.map((s) =>
                  s.id === section.id ? { ...s, importance: e.target.value } : s
                )
              )
            }
          />
          <QuestionsList
            questions={section.questions}
            deleteQuestion={(id) =>
              setSections((prev) =>
                prev.map((s) =>
                  s.id === section.id
                    ? {
                        ...s,
                        questions: s.questions.filter((q) => q.id !== id),
                      }
                    : s
                )
              )
            }
            editQuestion={(question) => {
              setEditingQuestion(question);
              setCurrentSectionId(section.id);
            }}
          />
          <button
            onClick={() => setCurrentSectionId(section.id)}
            className="create-question-btn"
          >
            Add Question
          </button>
        </div>
      ))}

      {currentSectionId && (
        <QuestionForm
          addQuestion={(question) => {
            if (editingQuestion) {
              updateQuestionInSection(currentSectionId, question);
              setEditingQuestion(null);
            } else {
              addQuestionToSection(currentSectionId, question);
            }
            setCurrentSectionId(null);
          }}
          editingQuestion={editingQuestion}
        />
      )}

      <button onClick={handleCreateForm} className="create-form-btn">
        Create Form
      </button>
    </div>
  );
};

export default App;
