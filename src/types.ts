export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  isEditing: boolean;
  newTitle?: string;
  newDescription?: string;
}
