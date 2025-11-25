import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem("loggedIn")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      {/* IMPORTANT - actual components (TaskForm, TaskList, FilterBar) will go here */}
      <p>🚀 Start by building the TaskForm next.</p>
    </div>
  );
}
