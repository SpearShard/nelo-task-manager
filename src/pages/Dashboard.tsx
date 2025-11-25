import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";

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

  const addTask = (task: any) => {
    setTasks([...tasks, { id: Date.now(), completed: false, ...task }]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

      <TaskForm onAddTask={addTask} />

      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
