export interface Option {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  title: string;
  instruction?: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "date"
    | "select"
    | "radio"
    | "checkbox"
    | "rating"
    | "percentage"
    | "slider"
    | "tags";
  required: boolean;
  options?: Option[];
  min?: number;
  max?: number;
}

export interface Section {
  id: number;
  title: string;
  description: string;
  importance: string;
  questions: Question[];
}
