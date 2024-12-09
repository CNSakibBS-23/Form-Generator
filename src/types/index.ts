export interface Option {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  type: string;
  required: boolean;
  options?: Option[];
}
