export interface Option {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
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
  min?: number; // For slider range
  max?: number; // For slider range
}
