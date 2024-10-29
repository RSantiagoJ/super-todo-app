export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  isEditing: boolean;
  // newTitle?: string;
  //newDescription?: string;
  newTitle: string | number | readonly string[] | undefined;
  newDescription: string | number | readonly string[] | undefined;
}
