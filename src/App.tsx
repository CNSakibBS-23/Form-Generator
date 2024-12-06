import React, { useState } from "react";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionsList";
import GeneratedForm from "./components/GeneratedForm";
import "./App.css";

interface Question {
  id: number;
  title: string;
  subtitle?: string;
  type: string;
  required: boolean;
  options?: string[];
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const addQuestion = (question: Question) => {
    setQuestions((prev) => [...prev, question]);
  };

  const handleCreateForm = () => {
    if (questions.length === 0) {
      alert("Please add at least one question to generate the form.");
      return;
    }
    console.log("Generated Form JSON:", JSON.stringify(questions, null, 2));
    setShowForm(true);
  };

  const handleSubmitForm = (formData: Record<string, any>) => {
    // Log submitted form data
    console.log("Submitted Form Data:", JSON.stringify(formData, null, 2));
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
