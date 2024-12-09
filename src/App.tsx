import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionsList";
import GeneratedForm from "./components/GeneratedForm";
import "./App.css";
import { Question } from "./types";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formUid, setFormUid] = useState<string>(""); // To store the form_uid
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const addQuestion = (question: Question) => {
    setQuestions((prev) => [...prev, question]);
  };

  const handleCreateForm = () => {
    if (questions.length === 0) {
      alert("Please add at least one question to generate the form.");
      return;
    }

    const generatedFormUid = `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .substr(2, 9)}`; // Generate unique form_uid
    setFormUid(generatedFormUid);

    const formattedJson = {
      form_uid: generatedFormUid,
      categories: [
        {
          id: 1,
          name: "Default Category",
          questions: questions.map((q) => ({
            id: q.id,
            title: q.title,
            required: q.required,
            type: q.type,
            options: q.options || [],
          })),
        },
      ],
    };

    console.log("Generated Form JSON:", JSON.stringify(formattedJson, null, 2));
    setShowForm(true);
  };

  const handleSubmitForm = (formData: Record<number, any>) => {
    const formattedJson = {
      form_uid: formUid, // Use the same form_uid generated earlier
      categories: [
        {
          id: 1,
          name: "Default Category",
          questions: questions.map((q) => ({
            id: q.id,
            title: q.title,
            required: q.required,
            type: q.type,
            options: q.options || [],
            value: formData[q.id] || null, // Attach submitted values here
          })),
        },
      ],
    };

    console.log("Submitted Form Data:", JSON.stringify(formattedJson, null, 2));
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const editQuestion = (question: Question) => {
    setEditingQuestion(question);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
    setEditingQuestion(null);
  };

  return (
    <div className="container">
      <div className="question-form">
        <QuestionForm
          addQuestion={addQuestion}
          editingQuestion={editingQuestion}
          updateQuestion={updateQuestion}
        />
      </div>

      <div className="question-list">
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          editQuestion={editQuestion}
        />
        <button className="create-form-btn" onClick={handleCreateForm}>
          Create Form
        </button>
      </div>

      <div className="phone-mockup">
        <div className="generated-form-container">
          {showForm && (
            <GeneratedForm
              questions={questions}
              handleSubmitForm={handleSubmitForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
